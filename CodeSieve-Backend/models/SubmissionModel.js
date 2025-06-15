const mongoose = require('mongoose');

const SubmissionSchema = mongoose.Schema({
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" },
  candidateEmail: String,
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" }, 
      code: String,
      output: String,
      passed: Boolean
    }
  ],
  startedAt: Date,
  submittedAt: Date,
  score: Number
}, { timestamps: true });

const Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = { Submission };
