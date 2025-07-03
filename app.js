const express = require('express');
const cors = require('cors')
const app = express()

require('dotenv').config();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
const passport = require('./config/passport')
app.use(passport.initialize())
app.use(express.json())

const { authRouter } = require('./routes/auth');
const { userRouter } = require('./routes/user');
const { postRouter } = require('./routes/post');

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(process.env.PORT, () => {
    console.log(`App successfully running on PORT ${process.env.PORT}`)
})