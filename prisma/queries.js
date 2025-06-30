const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

const createUser = async (username, password) => {
    await prisma.user.create({
        data: {
            username,
            password
        }
    })
}

const getUserByUsername = async (username, options = { includePassword: false }) => {
    return await prisma.user.findUnique({
        where: { username },
        select: options.includePassword ? {
                id: true, username: true, password: true
            } : {
                id: true, username: true
            }
    })
}

const createNewPost = async(userId, title, content, isPublished) => {
    await prisma.post.create({
        data: {
            userId,
            title,
            content,
            isPublished
        }
    })
}

const getUserPosts = async (userId, isPublished, id) => {
    let posts
    if (id == undefined) {
        posts = await prisma.post.findMany({
            where: {
                userId,
                isPublished
            }
        })
    } else {
        posts = await prisma.post.findFirst({
            where: {
                id,
                userId
            }
        })
    }
    return posts
}

const modifyPost = async (userId, postId, postDetails) => {
    const { title, content, isPublished } = postDetails
    await prisma.post.update({
        where: {
            id: postId,
            userId
        },
        data: {
            title,
            content,
            isPublished
        }
    })
}

const deletePost = async (postId, userId) => {
    await prisma.post.delete({
        where: {
            id: postId,
            userId
        }
    })
}

const getPosts = async (id) => {
    let posts
    if (id === undefined) {
        posts = await prisma.post.findMany({
            where: {
                isPublished: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })
    } else {
        posts = await prisma.post.findUnique({
            where: {
                id,
                isPublished: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })
    }
    return posts
}

const createComment = async (content, userId, postId) => {
    await prisma.comment.create({
        data: {
            content,
            userId,
            postId
        }
    })
}
const getAllUserComments = async (userId) => {
    return prisma.comment.findMany({
        where: {
            userId
        }
    })
}
const getAllPostComments = async (postId) => {
    return prisma.comment.findMany({
        where: {
            postId
        },
        select: {
            id: true,
            content: true,
            postId: true,
            user: {
                select: {
                    username: true
                }
            }
        }
    })
}
const deleteComment = async (id, userId) => {
    await prisma.comment.delete({
        where: {
            id,
            userId
        }
    })
}

module.exports = {
    createUser,
    getUserByUsername,
    createNewPost,
    getUserPosts,
    modifyPost,
    deletePost,
    getPosts,
    createComment,
    getAllUserComments,
    getAllPostComments,
    deleteComment
}