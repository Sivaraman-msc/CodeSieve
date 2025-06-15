import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StartTestService } from '../../Service/CandidateService';
import cookie from 'js-cookie';

export default function StartTest() {
  const [data, setData] = useState({ interviewId: '', email: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const res = await StartTestService(data);
      const submission = res.submission;

      cookie.set('submissionId', submission._id);

      navigate('/startTest');
    } catch (err) {
      setError(err.response?.data || 'Failed to start test');
    }
  };

  return (
    <div>
      <h2>Start Your Coding Test</h2>
      <input type="text" placeholder="Interview ID" name="interviewId" value={data.interviewId} onChange={handleChange} />
      <input type="email"  placeholder="Your Email" name="email" value={data.email} onChange={handleChange} />
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Start Test</button>
    </div>
  );
}
