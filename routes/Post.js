const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const Comment = require('../models/comment')
const moment = require('moment')
const bodyParser = require('body-parser')
const path = require('path')

function wrapAsync(fn) {
  return function (req, res, next) {
    // 모든 오류를 .catch() 처리하고 next()로 전달하기
    fn(req, res, next).catch(next);
  };
}

// 전체 게시물 가져오기
router.get('/', async (req, res) => {
  const posts = await Post.find({ deleted: 0 }).sort({ date: -1 });
  res.json(posts)
})

// 게시물 하나 가져오기
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const post = await Post.findOne({ id: id });
  
  const comments = await Comment.find({ postId: id, deleted: 0 }).sort({ id: -1 })
  res.json({
    post,
    comments
  })
  // res.sendFile(path.join(__dirname, '../client/post.html'), post);
  // res.render(path.join(__dirname + '../client/post.html'), {
  //   post: post
  // })
})

// 게시물 하나 올리기
router.post('/', async (req, res) => {
  try {
    const { title, contents, writer } = req.body;

    if (!title || !contents || !writer) {
      res.json({
        message: '내용을 전부 입력해주세요'
      })
      return;
    }

    const maxId = await Post.findOne().sort({"id":-1})
    let newId
    if (!maxId) {
      newId = 1
    } else {
      newId = maxId.id + 1
    }
    const newPost = await Post.create({
      id: newId,
      title,
      contents,
      writer,
      date: moment().format("YYYY-MM-DD hh:mm:ss"),
    })
    res.json(newPost)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

//게시물 하나 삭제
router.post('/:id', async (req, res) => {
  try {
    const postId = req.params.id
    await Post.updateOne({ id: postId }, {$set: { deleted: 1 }})

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

// 수정할 게시물 data
router.get('/update/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id)

    const post = await Post.findOne({ id: postId })

    res.json({ post })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

//게시물 수정
router.patch('/:id', async (req, res) => {
  try {
    const { title, contents, writer } = req.body
    const postId = parseInt(req.params.id)
  
    await Post.updateOne({ id: postId }, {$set: { title: title, contents: contents, writer: writer }})
    
    const post = await Post.findOne({ id: postId })
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
})

module.exports = router;