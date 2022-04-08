const express = require('express')
const Post = require('../models/post')
const Comment = require('../models/comment')
const router = express.Router()

// 해당 게시물 전체 댓글 가져오기
// router.get('/:postid', (req, res) => {

// })

// 댓글 작성
router.post('/:postid', async (req, res) => {
  const postId = parseInt(req.params.postid)
  const { comment } = req.body
  let newId
  const maxId = await Comment.findOne().sort({"id":-1})
  if (!maxId) {
    newId = 1
  } else {
    newId = maxId.id + 1
  }
  

  const post = await Post.findOne({ id: postId })
  const { id, creator } = post

  const newComment = await Comment.create({
    id: newId,
    comment: comment,
    postId: postId,
  })

  res.json({ success: true })
})

// 댓글 삭제
router.post('/:postid/:id', async (req, res) => {
  const postId = req.params.postid
  const id = req.params.id
  console.log(postId)
  console.log(id)

  await Comment.updateOne({ postId: postId, id: id }, {$set: { deleted: 1 }})
  console.log('????')
  res.json({ success: true })
})


// 댓글 수정
router.patch('/:postid/:id', (req, res) => {
  
})

module.exports = router;