const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb+srv://aryan:2aryanjpr@cluster0.ha5xscp.mongodb.net/shuruback?retryWrites=true&w=majority");
 
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
   // unique: true,
  },
  password: {
    type: String,
   // required: true,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  dp: {
    type: String, // Assuming dp is a URL or file path
  },
  email: {
    type: String,
    required: true,
  //  unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});
    userSchema.plugin(plm);


// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;

