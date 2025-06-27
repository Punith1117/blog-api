const { createNewPost, getUserPosts, modifyPost } = require("../prisma/queries")

const newPostController = async (req, res) => {
    const postDetails = req.body
    
    if (postDetails.isPublished === 'true')
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
const modifyPostController = async (req, res) => {
    if (req.body.isPublished == 'true')
        isPublished = true
    else
        isPublished = false

    const postDetails = {
        title: req.body.title,
        content: req.body.content,
        isPublished
    }
    
    await modifyPost(req.user.id, req.body.id, postDetails)
    res.json({ message: "Post modified successfully" })
}

module.exports = {
    newPostController,
    getAllPostsController,
    modifyPostController
}