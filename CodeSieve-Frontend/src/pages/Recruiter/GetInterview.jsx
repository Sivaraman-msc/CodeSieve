import React, { useEffect, useState } from "react";
import { GetInterviewService } from "../../Service/InterviewService";

export default function GetInterview({ fullWidth }) {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await GetInterviewService();
        setInterviews(res.interview);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInterview();
  }, []);

  return (
    <div className={`w-full ${fullWidth ? "px-0" : "px-4"} flex justify-center`} >
      <div className="w-full bg-white rounded-2xl shadow-lg p-4 border border-gray-200 text-left">
        <h2 className="text-xl font-bold mb-4 text-gray-800"> Scheduled Interviews </h2>
        {interviews.length === 0 ? (
          <p className="text-gray-500 text-center text-sm py-10"> No interviews scheduled yet. </p>
        ) : (
          <div className="max-h-80 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-4">
              {interviews.map((interview) => (
                <div key={interview._id} className="relative bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-xl shadow border border-gray-100 hover:shadow-md transition transform hover:-translate-y-1" style={{ background: "linear-gradient(90deg, #6dd5ed, #2193b0)" }} >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800"> {interview.title} </h3>
                    <span className="text-xs text-white"> {new Date(interview.deadline).toLocaleDateString()} </span>
                  </div>
                  <p className="text-white text-sm mb-1">
                    <span className="font-medium">Candidate:</span>{" "}
                    {interview.candidateEmail}
                  </p>
                  <p className="text-white text-sm mb-1">
                    <span className="font-medium">Deadline:</span>{" "}
                    {new Date(interview.deadline).toLocaleTimeString()}
                  </p>
                  <p className="text-white text-sm">
                    <span className="font-medium">Duration:</span>{" "}
                    {interview.durationInMinutes} mins
                  </p>
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-0.5 text-[10px] font-medium text-gray-600 shadow">
                    {interview.status || "Scheduled"}
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
