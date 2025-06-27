const { getPosts, getAllPostComments } = require("../prisma/queries")

const getPostsController = async (req, res) => {
    let posts
    if (req.params.id == undefined)
        posts = await getPosts()
    else
        posts = await getPosts(+req.params.id)
        
    res.json({
        posts
    })
}
const getAllCommentsController = async (req, res) => {
    const comments = await getAllPostComments(+req.params.id)
    res.json({ comments })
}

module.exports = {
    getPostsController,
    getAllCommentsController
}