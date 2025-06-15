import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import {ViewSubmissionService} from '../../Service/ViewSubmissionService'

export default function ViewSubmission() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = cookie.get('token');
        const res = await ViewSubmissionService()
        setSubmissions(res.submissions);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Candidate Submissions</h2>
      {submissions.map(sub => (
        <div key={sub._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <p><strong>Email:</strong> {sub.candidateEmail}</p>
          <p><strong>Status:</strong> {sub.interviewId?.status || 'N/A'}</p>
          <p><strong>Score:</strong> {sub.score != null ? sub.score : 'Not graded yet'}</p>
          <p><strong>Submitted At:</strong> {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : 'Not submitted'}</p>
        </div>
      ))}
    </div>
  );
}
