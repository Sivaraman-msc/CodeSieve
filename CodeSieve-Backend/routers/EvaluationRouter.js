const express=require('express')
const { AuthMiddleware } = require('../middleware/AuthMiddleware')
const { AuthRole } = require('../middleware/AuthRole')
const { getAllSubmissions } = require('../controllers/EvaluationController')
const EvRouter=express.Router()

EvRouter.get('/submissions',AuthMiddleware,AuthRole('Recruiter'),getAllSubmissions)

module.exports={EvRouter}