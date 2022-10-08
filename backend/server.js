const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const { errorHandler } = require('../backend/middleware/errorMiddleware')
const PORT = process.env.PORT || 8000;
const app = express()

const userRoutes = require('./routes/userRoutes')

//connect to db
connectDB()

//allows us to parse json responses
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('Hello')
})
//Routes
app.use('/api/users', userRoutes)


app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on ${PORT}`))