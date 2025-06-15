const jwt=require('jsonwebtoken')
require('dotenv').config()

const JWT_KEY=process.env.JWT_KEY

exports.AuthMiddleware=(req,res,next)=>{
    const authHeader=req.headers['authorization']

    if(!authHeader){
        return res.status(404).send('Token Not found')
    }

    const token=authHeader.split(' ')[1]

    jwt.verify(token,JWT_KEY,(err,decoded)=>{
        if(err){
            return res.status(401).send('Invalid Token')
        }
        req.user=decoded
        next()
    })
}