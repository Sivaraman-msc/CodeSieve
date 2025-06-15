const express=require('express')
const { AuthMiddleware } = require('../middleware/AuthMiddleware')
const { AuthRole } = require('../middleware/AuthRole')
const { Question, GetQuestion } = require('../controllers/QuestionController')

const QuestionRouter=express.Router()

QuestionRouter.post('/addQuestion',AuthMiddleware,AuthRole('Recruiter'),Question)
QuestionRouter.get('/getQuestion',AuthMiddleware,AuthRole('Recruiter'),GetQuestion)

module.exports={QuestionRouter}