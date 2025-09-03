import React, { useEffect, useState } from 'react';
import { ViewSubmissionService } from '../../Service/ViewSubmissionService';

export default function ViewSubmission({ fullWidth }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
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

  if (loading)
    return <div className="text-gray-600 text-center py-10 text-sm">Loading submissions...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10 text-sm">{error}</div>;

  return (
    <div className={`w-full ${fullWidth ? 'px-0' : 'px-4'} flex justify-center`}>
      <div className="w-full bg-white rounded-2xl shadow-lg p-4 border border-gray-200 text-left">
        <h2 className="text-xl font-bold mb-4 text-gray-800"> Candidate Submissions </h2>
        {submissions.length === 0 ? (
          <p className="text-gray-500 text-center text-sm py-10"> No submissions available yet. </p>
        ) : (
          <div className="max-h-80 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-4">
              {submissions.map((sub) => (
                <div key={sub._id} className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl shadow border border-gray-100 hover:shadow-md transition transform hover:-translate-y-1" >
                  <h3 className="text-base font-semibold text-gray-800 mb-1"> {sub.candidateEmail} </h3>
                  <p className="text-gray-700 text-xs mb-1">
                    <span className="font-medium">Status:</span>{' '}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${sub.interviewId?.status === 'Completed' ? 'bg-green-100 text-green-800' : sub.interviewId?.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-700'}`} >
                      {sub.interviewId?.status || 'N/A'}
                    </span>
                  </p>
                  {sub.answers && sub.answers.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold text-gray-700 mb-1"> Answers: </h4>
                      {sub.answers.map((ans) => (
                        <div key={ans._id} className="bg-gray-50 p-2 rounded mb-2 border border-gray-200" >
                          {ans.questionId ? (
                            <>
                              <p className="text-xs text-gray-600 mb-1">
                                <span className="font-medium">Question:</span>{' '}
                                {ans.questionId.title}
                              </p>
                              <p className="text-xs text-gray-600 mb-1">
                                <span className="font-medium">Description:</span>{' '}
                                {ans.questionId.description}
                              </p>
                            </>
                          ) : (
                            <p className="text-xs text-gray-600 mb-1">
                              <span className="font-medium">Question ID:</span>{' '}
                              {ans.questionId}
                            </p>
                          )}
                          <div className="text-xs text-gray-600 mb-1">
                            <span className="font-medium">Code:</span>
                            <div className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                              {ans.code}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-700 text-xs mb-1">
                    <span className="font-medium">Submitted At:</span>{' '}
                    {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : 'Not submitted'}
                  </p>
                  <div className="absolute top-3 right-3 text-gray-400 text-[10px]">
                    ID: {sub._id.slice(-6).toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
