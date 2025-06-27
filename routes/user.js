const express = require('express')
const userRouter = express.Router()
const { newPostController, getAllPostsController, modifyPostController } = require('../controllers/user')
const { isAuthenticated }  = require('../middlewares/auth')

userRouter.post('/me/post', isAuthenticated, newPostController)
userRouter.get('/me/post', isAuthenticated, getAllPostsController)
userRouter.put('/me/post', isAuthenticated, modifyPostController)

module.exports = { 
    userRouter
}