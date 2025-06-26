const { createNewPost } = require("../prisma/queries")

const newPostController = async (req, res) => {
    const postDetails = req.body
    
    if (postDetails.isPublished === 'True')
        isPublished = true
    else
        isPublished = false

    await createNewPost(req.user.id, postDetails.title, postDetails.content, isPublished)
    res.json({
        message: "post successfully uploaded"
    })
}

module.exports = {
    newPostController
}