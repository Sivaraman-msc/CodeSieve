const { Interview } = require("../models/InterviewModel");
const { Submission } = require("../models/SubmissionModel");

exports.getAllSubmissions = async (req, res) => {
    try {
    const submissions = await Submission.find()
      .populate('interviewId') 
      .populate('answers.questionId');

    res.status(200).json({ submissions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching submissions");
  }
};