const mongoose = require( "mongoose")
const moment = require("moment")

const PostSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    index: true,
  },
  contents: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user",
  // },
  creator: {
    type: String,
    default: 'wooseok',
  },
  deleted: {
    type : Number,
    default: 0,
  }
});

// PostSchema.virtual("postId").get(function () {
//   return this._id.toHexString();
// });
// PostSchema.set("toJSON", {
//   virtuals: true,
// })

const Post = mongoose.model("post", PostSchema);

// export default Post;
module.exports = Post;