const router = require('express').Router()
const UserService = require('../services/userService')

router.get('/', UserService.getUserList)
router.get('/:id', UserService.getUserById)
router.put('/:id', UserService.editUserById)
router.post('/create', UserService.createUser)
router.get('/:id/post', UserService.getUserPost)

module.exports = router
