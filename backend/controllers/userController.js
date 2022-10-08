const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { generateKey } = require('crypto')
/*
@desc Register a new user
@route /api/users
@access Public

*/
const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password } = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Fix your shit")
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User 
    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name, 
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new error("Invalid User data")
    }
})

/*
@desc login a new user
@route /api/users/login
@access Public

*/
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    //check if user and password match
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user._id,
            name: user.name, 
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})
/*
@Get current user
@route /api/users/me
@access Private
*/
const getMe =  asyncHandler(async (req, res) => {
    const user  = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user)
})
//Generate token
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports= {registerUser, loginUser,getMe}

/*
    We will be able to use that token to do other things throughtout the application
*/