const mongoose=require('mongoose')

const QuestionSchema=mongoose.Schema({
    title:String,
    description:String,
    starterCode:String,
    difficulty:{type:String,enum:['easy','medium','hard'],default:'easy'},
    testCases: [
    {
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true }
    }
],
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})

const Question=mongoose.model('Question',QuestionSchema)

module.exports={Question}