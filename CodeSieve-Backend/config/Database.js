const mongoose=require('mongoose')
require('dotenv').config()

const DB=process.env.MONGO_URI

exports.DBconnect=async()=>{
    try{
        await mongoose.connect(DB)
        console.log('MongoDB connected successfully')
    }catch(err){
        console.log(`MongoDB connection err ${err}`)
    }
}