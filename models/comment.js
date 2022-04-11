const mongoose = require( "mongoose")
const moment = require("moment")

const CommentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  // post: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "post",
  // },
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user",
  // },
  postId: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Number,
    default: 0
  },
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;