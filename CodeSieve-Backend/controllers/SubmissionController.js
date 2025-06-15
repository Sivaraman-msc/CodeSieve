const { Interview } = require("../models/InterviewModel")
const { Submission } = require("../models/SubmissionModel")

exports.StartTest = async (req, res) => {
    const { interviewId, email } = req.body;

    try {
        const interview = await Interview.findById(interviewId);
        if (!interview || interview.candidateEmail !== email) {
            return res.status(404).send("Interview not found or unauthorized");
        }

        const submission = new Submission({
            interviewId,
            candidateEmail: email,
            answers: interview.questions.map(q => ({ questionId: q })),
            startedAt: new Date()
        });

        interview.status = "in-progress";
        await Promise.all([interview.save(), submission.save()]);

        res.status(201).json({ message: "Test Started", submission });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to start test");
    }
};

exports.savetest = async (req, res) => {
    const { submissionId, questionId, code } = req.body

    try {
        const submission = await Submission.findById(submissionId);
        const answer = submission.answers.find(ans =>
            ans.questionId && ans.questionId.toString() === questionId);

        if (answer) answer.code = code;

        await submission.save();
        res.status(200).json({ message: "Code saved", submission });
    } catch (err) {
        console.error(err);
        res.status(500).send("Save failed");
    }
}

exports.SubmitTest = async (req, res) => {
  const { submissionId } = req.body;

  try {
    const submission = await Submission.findById(submissionId).populate("answers.questionId");

    if (!submission) {
      return res.status(404).send("Submission not found");
    }

    console.log("Submission found:", submission._id);
    console.log("Associated interviewId:", submission.interviewId);

    let score = 0;

    submission.answers.forEach(answer => {
      if (answer.code && answer.code.includes("return")) {
        answer.passed = true;
        score += 1;
      } else {
        answer.passed = false;
      }
    });

    submission.score = score;
    submission.submittedAt = new Date();

    await submission.save();
    console.log("Submission saved successfully");

    const interview = await Interview.findById(submission.interviewId);
    if (!interview) {
      return res.status(404).send("Interview not found");
    }

    interview.status = "submitted";
    await interview.save({ w: "majority", j: true });

    console.log("Interview status updated to 'submitted'");

    res.status(200).json({ message: "Test submitted", score, submission });
  } catch (err) {
    console.error("Error in SubmitTest:", err);
    res.status(500).send("Submit failed");
  }
};

exports.GetSubmissionById=async(req,res)=>{
  const { id } = req.params;

  try {
    const submission = await Submission.findById(id).populate('answers.questionId');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json({ message: 'Submission fetched', submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch submission' });
  }
}

exports.GetInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).send("Not found");
    res.status(200).json(interview);
  } catch (err) {
    res.status(500).send("Error getting interview");
  }
};
