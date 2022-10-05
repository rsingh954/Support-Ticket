const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000;
const app = express()
const userRoutes = require('./routes/userRoutes')


app.get('/', (req, res) => {
    res.send('Hello')
})
app.use('/api/users', userRoutes)
app.listen(PORT, () => console.log(`Server started on ${PORT}`))