const express = require('express')
const router = express.Router()

// 해당 게시물 전체 댓글 가져오기
router.get('/:postid', (req, res) => {

})

// 댓글 올리기
router.post('/:postid', (req, res) => {

})

// 댓글 삭제
router.delete('/:postid/:id', (req, res) => {

})


// 댓글 수정
router.patch('/:postid/:id', (req, res) => {

})

module.exports = router;