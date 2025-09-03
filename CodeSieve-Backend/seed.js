const mongoose = require("mongoose");
const {User} = require("./models/AuthModel");
const {Question} = require("./models/QuestionModel");
const {Interview} = require("./models/InterviewModel");
const {Submission }= require("./models/SubmissionModel");
require('dotenv').config()

const DB=process.env.MONGO_URI
mongoose.connect(DB, {});

const seedData = async () => {
  try {

    const recruiter = await User.create({
      name: "Siva",
      email: "siva@recruiter.com",
      password: "12345678",
      role: "Recruiter",
    });

    const candidate = await User.create({
      name: "Ram",
      email: "ram@gmail.com",
      password: "12345678",
      role: "Candidate",
    });

    const q1 = await Question.create({
      title: "Reverse a String",
      description: "Write a function to reverse a string.",
      starterCode: "function reverseString(str) { }",
      difficulty: "easy",
      testCases: [
        { input: "hello", expectedOutput: "olleh" },
        { input: "world", expectedOutput: "dlrow" },
      ],
      createdBy: recruiter._id,
    });

    const q2 = await Question.create({
      title: "Sum of Array",
      description: "Return the sum of all numbers in an array.",
      starterCode: "function sumArray(arr) { }",
      difficulty: "medium",
      testCases: [
        { input: "[1,2,3]", expectedOutput: "6" },
        { input: "[10,20,30]", expectedOutput: "60" },
      ],
      createdBy: recruiter._id,
    });

    const interview1 = await Interview.create({
      recruiterId: recruiter._id,
      candidateEmail: candidate.email,
      title: "Technical Round 1",
      questions: [q1._id],
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      durationInMinutes: 60,
      status: "submitted",
    });

    const interview2 = await Interview.create({
      recruiterId: recruiter._id,
      candidateEmail: candidate.email,
      title: "Technical Round 2",
      questions: [q2._id],
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      durationInMinutes: 45,
      status: "sent",
    });

    const submission1 = await Submission.create({
      interviewId: interview1._id,
      candidateEmail: candidate.email,
      answers: [
        {
          questionId: q1._id,
          code: "return str.split('').reverse().join('');",
          output: "olleh",
          passed: true,
        },
      ],
      startedAt: new Date(),
      submittedAt: new Date(),
      score: 100,
    });

    interview1.submission = submission1._id;
    await interview1.save();

    console.log("Seed data created successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
