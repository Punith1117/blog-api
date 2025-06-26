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
module.exports = {
    createUser,
    getUserByUsername,
    createNewPost
}