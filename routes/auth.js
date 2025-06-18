const express = require('express')
const { signupController } = require('../controllers/auth')
const authRouter = express.Router()

authRouter.post('/signup', signupController)

module.exports = {
    authRouter
}
