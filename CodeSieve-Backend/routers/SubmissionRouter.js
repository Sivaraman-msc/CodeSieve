const express=require('express')
const { AuthMiddleware } = require('../middleware/AuthMiddleware')
const { StartTest, savetest, SubmitTest,GetSubmissionById ,GetInterviewById} = require('../controllers/SubmissionController')
const SubmissionRouter=express.Router()

SubmissionRouter.post('/startTest',AuthMiddleware,StartTest)
SubmissionRouter.post('/saveTest',AuthMiddleware,savetest)
SubmissionRouter.post('/submitTest',AuthMiddleware,SubmitTest)
SubmissionRouter.get('/submission/:id',AuthMiddleware, GetSubmissionById);
SubmissionRouter.get('/interview/:id',AuthMiddleware, GetInterviewById);

module.exports={SubmissionRouter}