const express = require('express')
const userRouter = express.Router()
const { newPostController,
    getAllPostsController,
    modifyPostController,
    deletePostController,
    newCommentController
} = require('../controllers/user')
const { isAuthenticated }  = require('../middlewares/auth')

userRouter.post('/me/post', isAuthenticated, newPostController)
userRouter.get('/me/post', isAuthenticated, getAllPostsController)
userRouter.put('/me/post/:id', isAuthenticated, modifyPostController)
userRouter.delete('/me/post/:id', isAuthenticated, deletePostController)

userRouter.post('/me/comment', isAuthenticated, newCommentController)

module.exports = { 
    userRouter
}