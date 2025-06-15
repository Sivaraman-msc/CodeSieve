import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateInterviewService } from '../../Service/InterviewService'
import { GetQuestionService } from '../../Service/QuestionService'

export default function AddInterview() {
    const [formdata, setFormdata] = useState({
        candidateEmail: '',
        title: '',
        questions: [],
        deadline: '',
        durationInMinutes: ''
    })

    const [questions, setQuestions] = useState([])
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await GetQuestionService()
                console.log('Fetched questions:', res)
                setQuestions(res.question || [])
            } catch (err) {
                console.error('Error fetching questions:', err)
            }
        }
        fetchQuestions()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleMultiSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setFormdata((prev) => ({...prev,questions: checked? [...prev.questions, value]: prev.questions.filter((id) => id !== value)}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Submitting form:', formdata)

        try {
            const res = await CreateInterviewService(formdata)
            console.log('Interview Scheduled:', res)
            setMessage('Interview Scheduled')
            navigate('/home')
            setFormdata({candidateEmail:'',title:'',deadline:'',durationInMinutes:''})
        } catch (err) {
            console.error(err)
            setMessage('Something went wrong')
        }
    }

    return (
        <>
            <h2>Schedule Interview</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="candidateEmail" placeholder="Candidate Email" value={formdata.candidateEmail} onChange={handleChange} required />
                <input type="text" name="title" placeholder="Interview Title" value={formdata.title} onChange={handleChange} required />
                <label>Select Questions:</label>
                {questions.map((q) => (
                    <div key={q._id}>
                        <input type="checkbox" value={q._id} checked={formdata.questions.includes(q._id)} onChange={handleMultiSelect} />
                        <label>{q.title}</label>
                    </div>
                ))}
                <input type="number" name="durationInMinutes" placeholder="Duration in minutes" value={formdata.durationInMinutes} onChange={handleChange} required />
                <input type="datetime-local" name="deadline" value={formdata.deadline} onChange={handleChange} required />
                <button type="submit">Create Interview</button>
            </form>

            {message && <p>{message}</p>}
        </>
    )
}
