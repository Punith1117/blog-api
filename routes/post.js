const postRouter = require('express').Router()
const { getPostsController } = require('../controllers/post')

postRouter.get('/', getPostsController)
postRouter.get('/:id', getPostsController)

module.exports = {
    postRouter
}