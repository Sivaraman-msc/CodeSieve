import React, { useEffect, useState } from 'react';
import { GetQuestionService } from '../../Service/QuestionService';

export default function GetQuestion() {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    GetQuestionService()
      .then(res => setQuestion(res.question))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="w-full flex justify-center px-2">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-left">
        <h2 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-2">All Questions</h2>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {question.map((q, i) => (
            <div key={q._id} className="bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg border border-gray-100 shadow-sm" >
              <p><span className="font-medium text-gray-700">Title:</span> {q.title}</p>
              <p><span className="font-medium text-gray-700">Description:</span> {q.description}</p>
              <div className="mt-2">
                <p className="font-medium text-gray-700 mb-1">Starter Code:</p>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto text-gray-800">{q.starterCode}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
