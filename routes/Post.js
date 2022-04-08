const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const moment = require('moment')
const bodyParser = require('body-parser')
const path = require('path')

// 전체 게시물 가져오기
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts)
})

// 게시물 하나 가져오기
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const post = await Post.findOne({ id: id });
  // res.send(post.html)
  // res.json(post)
  res.sendFile(path.join(__dirname, '../client/post.html'), post);
})

// 게시물 하나 올리기
router.post('/', async (req, res) => {
  const { title, contents } = req.body;
  const maxId = await Post.findOne().sort({"id":-1})
  const newId = maxId.id + 1
  // if (maxId) {
  //   maxId = 0
  // }
  const newPost = await Post.create({
    id: newId,
    title,
    contents,
    date: moment().format("YYYY-MM-DD hh:mm:ss"),
  })
  res.json(newPost)
})

//게시물 하나 삭제
router.post('/:id', (req, res) => {

})


//게시물 수정
router.patch('/:id', (req, res) => {

})

module.exports = router;