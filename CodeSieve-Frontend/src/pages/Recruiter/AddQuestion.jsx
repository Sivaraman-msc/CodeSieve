import React, { useState } from 'react';
import { AddQuestionService } from '../../Service/QuestionService';
import { useNavigate } from 'react-router-dom';

export default function AddQuestion() {
  const [formdata, setFormdata] = useState({
    title: '',
    description: '',
    starterCode: '',
    difficulty: 'easy',
    testCases: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const parsedTestCases = JSON.parse(formdata.testCases);
      const finalFormdata = { ...formdata, testCases: parsedTestCases };

      const res = await AddQuestionService(finalFormdata);
      console.log('Question added:', res);
      setMessage('Question Added Successfully!');
      navigate('/home');
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong - check token or test case format');
    }
  };

  return (

    <div className="relative z-30 w-full max-w-xl bg-white shadow-2xl rounded-xl p-6 mx-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Question</h2>
      <form onSubmit={handleClick} className="space-y-5">
        <input type="text" name="title" value={formdata.title} onChange={handleChange} required placeholder="Title" className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black" />
        <textarea name="description" value={formdata.description} onChange={handleChange} required placeholder="Description" className="w-full border border-gray-300 px-3 py-2 text-sm rounded resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-black" />
        <textarea name="starterCode" value={formdata.starterCode} onChange={handleChange} required placeholder="Starter Code" className="w-full border border-gray-300 px-3 py-2 text-sm rounded font-mono resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-black" />
        <select name="difficulty" value={formdata.difficulty} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 text-sm rounded bg-white focus:outline-none focus:ring-2 focus:ring-black">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <textarea name="testCases" value={formdata.testCases} onChange={handleChange} placeholder='Test Cases (JSON format) e.g. [{"input":"2 3","expectedOutput":"5"}]' required className="w-full border border-gray-300 px-3 py-2 text-sm rounded font-mono resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-black" />
        <button type="submit" className="w-full bg-black text-white text-sm py-2 font-medium rounded hover:opacity-90 transition"> Submit</button>
        {message && (
          <p className={`text-sm text-center ${message === 'Question Added Successfully!' ? 'text-green-600' : 'text-red-600'}`} >{message}</p>
        )}
      </form>
    </div>
  );
}
