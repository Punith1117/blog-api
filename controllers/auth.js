const { createUser, getUserByUsername } = require('../prisma/queries')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { clean } = require('../utilities')

const signupController = async (req, res) => {
    let username = clean(req.body.username)
    let password = clean(req.body.password)
    if (username === '' || password === '') {
        res.status(401).json({ message: 'Invalid credentials' })
    }
    let hashedPassword = await bcryptjs.hash(password, 10)
    await createUser(username, hashedPassword)
    res.status(201).json({
        message: 'User created successfully',
        username
    })
}

const loginController = async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    
    let user = await getUserByUsername(username, { includePassword:true })
    const isMatch = await bcryptjs.compare(password, user.password)

    if (isMatch) {
        const token = jwt.sign({
            id: user.id, username: user.username
        }, process.env.JWT_SECRET, { expiresIn: '2min' })

        res.json({ token, user: { id: user.id, username: user.username } })
    } else {
        res.status(401).json({ message: 'Invalid credentials' })
    }
}

module.exports = {
    signupController,
    loginController
}