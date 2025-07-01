import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateInterviewService } from '../../Service/InterviewService';
import { GetQuestionService } from '../../Service/QuestionService';

export default function AddInterview() {
  const [formdata, setFormdata] = useState({
    candidateEmail: '',
    title: '',
    questions: [],
    deadline: '',
    durationInMinutes: ''
  });

  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await GetQuestionService();
        setQuestions(res.question || []);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setFormdata((prev) => ({
      ...prev,
      questions: checked
        ? [...prev.questions, value]
        : prev.questions.filter((id) => id !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CreateInterviewService(formdata);
      setMessage('Interview Scheduled');
      navigate('/home');
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong');
    }
  };

  return (

      <div className="relative z-30 w-full max-w-xl bg-white shadow-2xl rounded-xl p-6 mx-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Schedule Interview</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="candidateEmail" placeholder="Candidate Email" value={formdata.candidateEmail} onChange={handleChange} required className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black"/>
          <input type="text" name="title"  placeholder="Interview Title" value={formdata.title} onChange={handleChange} required className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black"/>

            <p className="font-medium text-sm text-gray-700 mb-1">Select Questions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2">
              {questions.map((q) => (
                <label key={q._id} className="flex items-center space-x-2 text-sm">
                  <input  type="checkbox" value={q._id} checked={formdata.questions.includes(q._id)} onChange={handleMultiSelect} className="accent-black" />
                  <span>{q.title}</span>
                </label>
              ))}
          </div>

          <input type="number" name="durationInMinutes" placeholder="Duration in minutes 2025-06-30T18:00:00.000Z" value={formdata.durationInMinutes} onChange={handleChange} required className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black"/>
          <input type="datetime-local" name="deadline"  value={formdata.deadline} onChange={handleChange} required className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black"/>

          <button type="submit" className="w-full bg-black text-white text-sm py-2 font-medium rounded hover:opacity-90 transition"> Create Interview </button>

          {message && (
            <p className={`text-sm text-center ${message === 'Interview Scheduled' ? 'text-green-600' : 'text-red-600'}`}> {message}</p>
          )}
        </form>
      </div>
  );
}
