const express=require('express')
const { AuthMiddleware } = require('../middleware/AuthMiddleware')
const { AuthRole } = require('../middleware/AuthRole')
const { CreateInterview, GetRecruiterinterview } = require('../controllers/InterviewController')
const InterviewRouter=express.Router()

InterviewRouter.post('/createInterview',AuthMiddleware,AuthRole('Recruiter'),CreateInterview)
InterviewRouter.get('/getInterview',AuthMiddleware,AuthRole('Recruiter'),GetRecruiterinterview)

module.exports={InterviewRouter}