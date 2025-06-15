const mongoose=require('mongoose')

const QuestionSchema=mongoose.Schema({
    title:String,
    description:String,
    starterCode:String,
    difficulty:{type:String,enum:['easy','medium','hard'],default:'easy'},
    testCases:{
        input:String,
        expectedOutput:String
    },
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})

const Question=mongoose.model('Question',QuestionSchema)

module.exports={Question}