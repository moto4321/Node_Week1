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