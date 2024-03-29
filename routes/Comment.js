const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');
const router = express.Router();

// 해당 댓글 하나 가져오기
router.get('/:postId/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const oneComment = await Comment.findOne({ id: commentId });

    return res.json(oneComment);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

// 댓글 작성
router.post('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    let newId;
    const maxId = await Comment.findOne().sort({ id: -1 });
    if (!maxId) {
      newId = 1;
    } else {
      newId = maxId.id + 1;
    }

    const post = await Post.findOne({ id: postId });
    const { id, creator } = post;

    const newComment = await Comment.create({
      id: newId,
      comment: comment,
      postId: postId,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

// 댓글 삭제
router.post('/:postId/:commentId', async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    await Comment.updateOne(
      { postId: postId, id: commentId },
      { $set: { deleted: 1 } }
    );
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

// 댓글 수정
router.patch('/:postId/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { newComment } = req.body;

    await Comment.updateOne({ id: commentId }, { $set: { comment: newComment } });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
