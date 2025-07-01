import React, { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { ViewSubmissionService } from '../../Service/ViewSubmissionService';

export default function ViewSubmission() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = cookie.get('token');
        const res = await ViewSubmissionService();
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

  if (loading) return <div className="text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="text-left bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-2">Candidate Submissions</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {submissions.map((sub) => (
          <div key={sub._id} className="bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg border border-gray-100 shadow-sm">
            <p><span className="font-medium text-gray-700">Email:</span> {sub.candidateEmail}</p>
            <p><span className="font-medium text-gray-700">Status:</span> {sub.interviewId?.status || 'N/A'}</p>
            <p><span className="font-medium text-gray-700">Score:</span> {sub.score != null ? sub.score : 'Not graded yet'}</p>
            <p><span className="font-medium text-gray-700">Submitted At:</span> {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : 'Not submitted'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
