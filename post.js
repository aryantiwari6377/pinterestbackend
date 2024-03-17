const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
  imageText: {
    type: String,
    required: false,
  },
 image: {
    type: String,
},

  currentDateAndTime: {
    type: Date,
    default: Date.now,
  },
  
  likes: {
    type: Array,
    default: [],
  },
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

// Export the model
module.exports = Post;

