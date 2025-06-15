const { Interview } = require("../models/InterviewModel")
const { Sendmail } = require("../utils/Nodemailer")

exports.CreateInterview = async (req, res) => {
    const { candidateEmail, title, questions, deadline, durationInMinutes } = req.body

    try {
        if (!candidateEmail || !title || !questions || !deadline || !durationInMinutes) {
            return res.status(400).send('All fields are required')
        }

        const newInterview = await new Interview({ recruiterId: req.user.id, candidateEmail, title, questions, deadline, durationInMinutes })

        await newInterview.save()
        res.status(201).json({ message: 'Interview Created', newInterview })

        if (candidateEmail) {
            const msg = `Hi,\n\nYou've been invited to complete a coding interview titled "${title}".\n\nPlease check your inbox or use the link provided by the recruiter to begin.\n\n- CodeSieve`

            await Sendmail(candidateEmail, 'CodeSieve Interview Invitation', msg)
        }

    } catch (err) {
        res.status(500).send('Something went wrong')
        console.log(err)
    }
}

exports.GetRecruiterinterview = async (req, res) => {
    try {
        const interview = await Interview.find({ recruiterId: req.user.id }).populate("questions")
        res.status(200).json({ message: 'Interview Fetched', interview })
    } catch (err) {
        res.status(500).send('Something went wrong')
        console.log(err)
    }
}