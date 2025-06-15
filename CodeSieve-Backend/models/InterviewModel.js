const mongoose=require('mongoose')

const InterviewSchema=mongoose.Schema({
    recruiterId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    candidateEmail:String,
    title:String,
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}],
    deadline:Date,
    durationInMinutes:Number,
    status:{type:String,enum:["sent","in-progress","submitted"],default:"sent"},
    submission:{type:mongoose.Schema.Types.ObjectId,ref:"Submission"}
},{timestamps:true})

const Interview=mongoose.model('Interview',InterviewSchema)

module.exports={Interview}