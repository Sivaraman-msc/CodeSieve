const express=require('express')
const { SignUp, Login } = require('../controllers/AuthController')
const AuthRouter=express.Router()

AuthRouter.post('/signup',SignUp)
AuthRouter.post('/login',Login)

module.exports={AuthRouter}