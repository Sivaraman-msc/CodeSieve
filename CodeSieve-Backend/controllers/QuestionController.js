const { Question } = require("../models/QuestionModel")

exports.Question=async(req,res)=>{
    const {title,description,starterCode,difficulty,testCases}=req.body
    try{
        if(!title || !description || !starterCode || !difficulty || !testCases){
            return res.status(400).send('All fields are required')
        }

        const question=await new Question({title,description,starterCode,difficulty,testCases,createdBy:req.user.id})
        await question.save()

        res.status(201).json({message:'Question created',question})

    }catch(err){
        console.log(err)
        res.status(500).send('Something went wrong')
    }
}

exports.GetQuestion=async(req,res)=>{
    try{
        const question=await Question.find({createdBy:req.user.id})
        res.status(200).json({message:"Question Retrieved ",question})
    }catch(err){
        console.log(err)
        res.status(500).send('Something went wrong')
    }
}