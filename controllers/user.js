const { createNewPost, getUserPosts } = require("../prisma/queries")

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

module.exports = {
    newPostController,
    getAllPostsController
}