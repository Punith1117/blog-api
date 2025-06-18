const { createUser } = require('../prisma/queries')
const bcryptjs = require('bcryptjs')

const signupController = async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let hashedPassword = await bcryptjs.hash(password, 10)
    await createUser(username, hashedPassword)
    res.status(201).json({
        message: 'User created successfully',
        username
    })
}

module.exports = {
    signupController
}