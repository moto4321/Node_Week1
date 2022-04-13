const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const moment = require('moment');
const bodyParser = require('body-parser');
const path = require('path');
const joi = require('joi');

function wrapAsync(fn) {
  return function (req, res, next) {
    // 모든 오류를 .catch() 처리하고 next()로 전달하기
    fn(req, res, next).catch(next);
  };
}



// 전체 게시물 가져오기
router.get('/', async (req, res) => {
  const posts = await Post.find({ deleted: 0 }).sort({ date: -1 });
  return res.json(posts);
});

// 게시물 하나 가져오기
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const post = await Post.findOne({ id });

  const comments = await Comment.find({ postId: id, deleted: 0 }).sort({
    id: -1,
  });
  return res.json({
    post,
    comments,
  });
});

const joiSchema = joi.object({
  title: joi.string().min(3).max(30).required(),
  contents: joi.string().min(10).max(50).required(),
  writer: joi.string().min(2).max(10).required()
});

// 게시물 올리기
router.post('/', async (req, res) => {
  try {
    const { title, contents, writer } = await joiSchema.validateAsync(req.body);

    if (!title || !contents || !writer) {
      res.json({
        message: '내용을 전부 입력해주세요',
      });
      return;
    }

    const maxId = await Post.findOne().sort({ id: -1 });
    let newId;
    if (!maxId) {
      newId = 1;
    } else {
      newId = maxId.id + 1;
    }
    const newPost = await Post.create({
      id: newId,
      title,
      contents,
      writer,
      date: moment().format('YYYY-MM-DD hh:mm:ss'),
    });
    return res.json(newPost);
  } catch (error) {
    return res.status(400).json({
      errorMessage: '입력 형식이 맞지 않습니다.',
    })
  }
});

//게시물 하나 삭제
router.post('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.updateOne({ id: postId }, { $set: { deleted: 1 } });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

// 수정할 게시물 data
router.get('/update/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id);

    const post = await Post.findOne({ id: postId });

    return res.json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

//게시물 수정
router.patch('/:id', async (req, res) => {
  try {
    const { title, contents, writer } = req.body;
    const postId = parseInt(req.params.id);

    await Post.updateOne(
      { id: postId },
      { $set: { title: title, contents: contents, writer: writer } }
    );

    const post = await Post.findOne({ id: postId });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
