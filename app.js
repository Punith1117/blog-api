const express = require('express');
const { authRouter } = require('./routes/auth');
require('dotenv').config();

const app = express()
app.use(express.json())
app.use('/auth', authRouter)

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(process.env.PORT, () => {
    console.log(`App successfully running on PORT ${process.env.PORT}`)
})