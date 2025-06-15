const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:{type:String,enum:['Recruiter','Candidate'],default:'Candidate'}
},{timestamps:true})

const User=mongoose.model('User',userSchema)

module.exports={User}