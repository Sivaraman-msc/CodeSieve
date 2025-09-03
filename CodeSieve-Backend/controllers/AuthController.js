const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models/AuthModel')
const { Sendmail } = require('../utils/Nodemailer')
require('dotenv').config()

const JWT_KEY = process.env.JWT_KEY

exports.SignUp = async (req, res) => {
    const { name, email, password, role } = req.body

    try {
        if (!name || !email || !password || !role) {
            return res.status(400).send('All fields are required')
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).send("user already exists !")
        }
        const hash = await bcrypt.hash(password, 10)

        const user = await new User({ name, email, password: hash, role })

        const msg = `Hello ${name}, welcome to CodeSieve`

        await Sendmail(email, 'CodeSieve', msg)

        await user.save()
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_KEY, { expiresIn: '30d' })

        res.status(201).json({ message: 'SignUp successfull', user, token })

    } catch (err) {
        res.status(500).send('Something went wrong')
        console.log(err)
    }
}

exports.Login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send('User not found')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send('Invalid Password')
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_KEY, { expiresIn: '30d' })

        res.status(200).json({
            message: 'Login Successful',
            user: {name:user.name, email: user.email, role: user.role, id: user._id },
            token
        })

    } catch (err) {
        res.status(500).send('Something went wrong')
        console.log(err)
    }
}