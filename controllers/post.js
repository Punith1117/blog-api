const { getPosts } = require("../prisma/queries")

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

module.exports = {
    getPostsController
}