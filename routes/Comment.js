const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');
const router = express.Router();

// 해당 댓글 하나 가져오기
router.get('/:postid/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const oneComment = await Comment.findOne({ id: id });

    res.json(oneComment);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// 댓글 작성
router.post('/:postid', async (req, res) => {
  try {
    const postId = parseInt(req.params.postid);
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

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// 댓글 삭제
router.post('/:postid/:id', async (req, res) => {
  try {
    const postId = req.params.postid;
    const id = req.params.id;

    await Comment.updateOne(
      { postId: postId, id: id },
      { $set: { deleted: 1 } }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// 댓글 수정
router.patch('/:postid/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { newComment } = req.body;

    await Comment.updateOne({ id: id }, { $set: { comment: newComment } });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
