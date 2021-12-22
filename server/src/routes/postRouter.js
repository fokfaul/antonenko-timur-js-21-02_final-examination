const router = require('express').Router()
const PostService = require('../services/postService')

router.get('/', PostService.getPostList)
router.get('/:id', PostService.getPostById)
router.get('/:id/comment', PostService.getPostComment)

module.exports = router
