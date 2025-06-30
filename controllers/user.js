const { createNewPost, getUserPosts, modifyPost, deletePost, createComment, getAllUserComments, deleteComment } = require("../prisma/queries")

const newPostController = async (req, res) => {
    const postDetails = req.body
    
    if (postDetails.isPublished === true)
        isPublished = true
    else
        isPublished = false

    await createNewPost(req.user.id, postDetails.title, postDetails.content, isPublished)
    res.json({
        message: "post successfully uploaded"
    })
}
const getAllPostsController = async (req, res) => {
    if (req.query.isPublished == 'true')
        isPublished = true
    else
        isPublished = false

    const posts = await getUserPosts(req.user.id, isPublished)
    res.json({
        posts: posts
    })
}
const getPostController = async (req, res) => {
    const postId = +req.params.id
    const posts = await getUserPosts(req.user.id, null, postId)
    res.json({
        posts: posts
    })
}
const modifyPostController = async (req, res) => {
    if (req.body.isPublished === true)
        isPublished = true
    else
        isPublished = false

    const postDetails = {
        title: req.body.title,
        content: req.body.content,
        isPublished
    }
    
    await modifyPost(req.user.id, +req.params.id, postDetails)
    res.json({ message: "Post modified successfully" })
}
const deletePostController = async (req, res) => {
    await deletePost(+req.params.id, req.user.id)
    res.json({ message: "Post deleted successfully" })
}

const newCommentController = async (req, res) => {
    await createComment(req.body.content, req.user.id, req.body.postId)
    res.json({ message: "Comment successfully uploaded" })
}
const getAllCommentsController = async (req, res) => {
    const comments = await getAllUserComments(req.user.id)
    res.json({ comments })
}
const deleteCommentController = async (req, res) => {
    await deleteComment(+req.params.id, req.user.id)
    res.json({ message: "Comment deleted successfully" })
}

module.exports = {
    newPostController,
    getAllPostsController,
    getPostController,
    modifyPostController,
    deletePostController,
    newCommentController,
    getAllCommentsController,
    deleteCommentController
}