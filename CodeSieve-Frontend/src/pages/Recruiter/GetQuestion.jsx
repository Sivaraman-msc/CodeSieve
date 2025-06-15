import React, { useEffect, useState } from 'react'
import { GetQuestionService } from '../../Service/QuestionService'

export default function GetQuestion() {
    const [question, setQuestion] = useState([])

    useEffect(() => {
        GetQuestionService()
            .then(res => setQuestion(res.question))
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            <div>
                <h2>All Questions</h2>
                {question.map((q, i) => (
                    <div key={q._id}>
                        <h4>{i + 1}. {q.title}</h4>
                        <p>{q.description}</p>
                        <code>{q.starterCode}</code>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    )
}
