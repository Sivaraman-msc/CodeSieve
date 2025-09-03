import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StartTestService } from '../../Service/CandidateService';

export default function StartTest() {
  const [data, setData] = useState({ interviewId: '', email: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await StartTestService(data);
      const submission = res.submission;
      localStorage.setItem('submissionId', submission._id);
      navigate('/startTest');
    } catch (err) {
      setError(err.response?.data || 'Failed to start test');
    }
  };

  return (

    <div className="relative z-30 w-full max-w-sm bg-white shadow-2xl rounded-xl p-6 mx-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Start Test</h2>
      <form onSubmit={handleClick} className="space-y-5">
        <input type="text" name="interviewId" value={data.interviewId} onChange={handleChange} required placeholder="Interview ID" className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black" />
        <input type="email" name="email" value={data.email} onChange={handleChange} required placeholder="Your Email" className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black" />
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <button type="submit" className="w-full bg-black text-white py-2 text-sm font-medium rounded hover:opacity-90 transition">
          Start Test
        </button>
      </form>
    </div>
  );
}
