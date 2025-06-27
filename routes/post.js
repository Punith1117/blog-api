const postRouter = require('express').Router()
const { getPostsController, getAllCommentsController } = require('../controllers/post')

postRouter.get('/', getPostsController)
postRouter.get('/:id', getPostsController)
postRouter.get('/:id/comment', getAllCommentsController)

module.exports = {
    postRouter
}