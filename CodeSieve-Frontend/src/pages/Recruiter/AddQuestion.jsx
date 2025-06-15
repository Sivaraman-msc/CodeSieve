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
      const finalFormdata = {...formdata,testCases: parsedTestCases,};

      const res = await AddQuestionService(finalFormdata);
      console.log('Question added:', res);
      setMessage('Question Added Successfully!');
      navigate('/home');
    } catch (err) {
      console.error(err);
      setMessage(' Something went wrong - check token, testCases format');
    }
  };

  return (
    <>
      <form onSubmit={handleClick}>
          <label>Title</label>
          <input type="text" name="title" value={formdata.title} onChange={handleChange} required />
          <label>Description</label>
          <textarea name="description" value={formdata.description} onChange={handleChange} required />
          <label>Starter Code</label>
          <textarea name="starterCode" value={formdata.starterCode}  onChange={handleChange} required />
          <label>Difficulty</label>
          <select name="difficulty" value={formdata.difficulty} onChange={handleChange} >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label>Test Cases (JSON format)</label>
          <textarea name="testCases" value={formdata.testCases} onChange={handleChange} placeholder='Example: {"input": "2 3", "expectedOutput": "5"}' required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
