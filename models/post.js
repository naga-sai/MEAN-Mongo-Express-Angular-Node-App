const mongoose = require("mongoose");

//Comment Schema
var commentSchema = mongoose.Schema({
  text: String,
  author: { type: String, default: "a@g.com" }
});

//Post Schema
const postSchema = mongoose.Schema({
  postTitle: String,
  postDescription: String,
  createdBy: { type: String, default: "a@g.com" },
  comments: [commentSchema],
  likes: [
    {
      type: String
    }
  ]
});

const postModel = mongoose.model("post", postSchema);

module.exports = {
  post: postModel
};
