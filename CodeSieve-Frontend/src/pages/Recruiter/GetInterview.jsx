import React, { useEffect, useState } from 'react';
import { GetInterviewService } from '../../Service/InterviewService';

export default function GetInterview() {
  const [formdata, setFormdata] = useState([]);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await GetInterviewService();
        setFormdata(res.interview);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInterview();
  }, []);

  return (
    <div className="text-left bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-2">Scheduled Interviews</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {formdata.map((interview, count) => (
          <div key={interview._id} className="bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg border border-gray-100 shadow-sm" >
            <p><span className="font-medium text-gray-700">Title:</span> {interview.title}</p>
            <p><span className="font-medium text-gray-700">Candidate:</span> {interview.candidateEmail}</p>
            <p><span className="font-medium text-gray-700">Deadline:</span> {new Date(interview.deadline).toLocaleString()}</p>
            <p><span className="font-medium text-gray-700">Duration:</span> {interview.durationInMinutes} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
}
