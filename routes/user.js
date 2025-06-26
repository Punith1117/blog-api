const express = require('express')
const userRouter = express.Router()
const { newPostController } = require('../controllers/user')
const { isAuthenticated }  = require('../middlewares/auth')

userRouter.post('/me/post', isAuthenticated, newPostController)

module.exports = { 
    userRouter
}