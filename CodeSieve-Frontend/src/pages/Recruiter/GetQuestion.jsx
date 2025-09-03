import React, { useEffect, useState } from "react";
import { GetQuestionService } from "../../Service/QuestionService";

export default function GetQuestion() {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    GetQuestionService()
      .then((res) => setQuestion(res.question))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full flex justify-center px-2 md:px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800"> All Coding Questions </h2>
          <span className="text-xs md:text-sm text-gray-500">
            {question.length} Questions
          </span>
        </div>
        <div className="space-y-4 text-left max-h-[220px] md:max-h-[300px] overflow-y-auto pr-2">
          {question.map((q) => (
            <div key={q._id} style={{ background: "linear-gradient(90deg, #6dd5ed, #2193b0)" }} className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition" >
              <h3 className="text-base md:text-lg font-semibold text-white mb-1"> {q.title} </h3>
              <p className="text-white text-xs md:text-sm leading-relaxed mb-2">{q.description} </p>
              <div>
                <p className="text-xs md:text-sm font-medium text-white mb-1"> Starter Code: </p>
                <pre className="bg-gray-900 text-green-300 p-2 rounded-lg text-xs md:text-sm overflow-x-auto"> {q.starterCode}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
