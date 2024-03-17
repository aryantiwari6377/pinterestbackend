var express = require('express');
var router =express.Router();
const userModel= require("./users");
const postModel= require("./post");
const passport= require('passport');
const upload= require("./multer");

const localStrategy= require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get('/',function(req,res,next){
  res.render('index',{title: 'express'});
});


router.get('/login',function(req,res,next){
  //console.log(req.flash('error'));
  res.render('login',{error: req.flash('error')});
})

router.get('/feed',function(req,res,next){
  res.render('feed');
})
router.post('/upload',isLoggedIn,upload.single("file"),async function(req,res,next){
         if(!req.file){
          return res.status(400).send("no files were given");
         }
         const user =await userModel.findOne({username:req.session.passport.user});
         const post = await postModel.create({
          image:req.file.filename,
          imageText:req.body.filecaption,
          user: user._id 
         });
         user.posts.push(post._id);
         await user.save();
         res.send("file uploaded succesfully");
});



router.get('/profile',isLoggedIn,async function(req,res, next){
  const user= await userModel.findOne({
    username: req.session.passport.user
  })
  .populate("posts")
  console.log(user);

  res.render("profile",{user});
});
 //jab profile router chlega tho apn isloggedin per jayege or shi h tho agla it means chal jayega otherwise
 // login per aayege then login router me phle password check hoga ager authenticate h tho profile chal jayega
 // otherwise ider bhi login page or router he rhega 


  

/*
router.post("/register",function(req,res){
  const{username, email, fullname} = req.body;
  const userData = new userModel({ username, email, fullname});
 // console.log(req.body);
  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");                       
    })
  })
   
}) */




router.post("/register", function(req, res) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.findOne({ username: username })
    .then(existingUser => {
      if (existingUser) {
        // Username already exists, handle the error
        console.log("Username already exists");
        res.redirect("/profile"); // Redirect to the home page or handle the error as needed
      } else {
        // Username is unique, proceed with registration
        userModel.register(userData, req.body.password)
          .then(function() {
            passport.authenticate("local")(req, res, function() {
              res.redirect("/profile");
            });
          })
          .catch(function(err) {
            // Handle registration error here
            console.log(err);
            res.redirect("/"); // Redirect to the home page or handle the error as needed
          });
      }
    })
    .catch(function(err) {
      console.log(err);
      res.redirect("/"); // Redirect to the home page or handle the error as needed
    });
});      

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}), function(req, res) {

});


router.get("/logout",function(req,res){
  req.logout(function(err){
    if(err){return next(err); }
    res.redirect('/');
  });
})
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}


module.exports = router;
//dikat ager registeration kerke login aata h or fir wo chalta nhi h 
/*register kerne per data bhi save ho rha h or login page aa rha h
login kerne per registration ka aa rha h 
mene iska registration code tha wo comment kerke chatgpt se le liya

*/