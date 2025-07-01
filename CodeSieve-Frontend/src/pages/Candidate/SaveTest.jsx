import React, { useEffect, useState } from 'react';
import { GetSubmissionById, SaveAnswerCode, SubmitTest } from '../../Service/CandidateService';
import cookie from 'js-cookie';
import Editor from '@monaco-editor/react';
import s1 from '../../../public/s2.png'; 
import { useNavigate } from 'react-router-dom';

export default function SaveTest() {
  const [submission, setSubmission] = useState(null);
  const [message, setMessage] = useState('');
  const submissionId = cookie.get('submissionId');
  const navigate=useNavigate();

  useEffect(() => {
    const loadSubmission = async () => {
      if (!submissionId || submissionId === '[object Object]') {
        setMessage('Invalid or missing submission ID.');
        return;
      }

      try {
        const res = await GetSubmissionById(submissionId);
        setSubmission(res.submission);
      } catch (err) {
        setMessage('Failed to load submission.');
      }
    };

    loadSubmission();
  }, [submissionId]);

  const handleCodeChange = (index, newCode) => {
    const updated = { ...submission };
    updated.answers[index].code = newCode;
    setSubmission(updated);
  };

  const handleSave = async (index) => {
    try {
      const answer = submission.answers[index];
      await SaveAnswerCode({
        submissionId,
        questionId: answer.questionId._id,
        code: answer.code,
      });
      setMessage('Code saved successfully!');
    } catch (err) {
      setMessage('Failed to save code.');
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await SubmitTest({ submissionId });
      console.log("Submitted test:", res);
      setMessage('Test submitted successfully!');
      navigate('/home');
    } catch (err) {
      console.error('Error submitting test:', err);
      setMessage('Failed to submit test.');
    }
  };

  if (!submission) return <div className="text-gray-600 text-center py-10">{message || 'Loading...'}</div>;

  return (
    <div className="relative text-left w-full min-h-screen bg-white flex flex-col items-center justify-start px-4 pb-10">
      <img src={s1} alt="bg" className="absolute top-0 left-0 w-full h-full object-cover opacity-5 pointer-events-none select-none"/>

      <div className="w-full max-w-5xl z-10 py-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Task</h2>
        {message && (
          <p className={`text-center text-sm font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>

      <div className="w-full max-w-5xl z-10 space-y-10">
        {submission.answers.map((answer, index) => (
          <div key={answer.questionId._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{answer.questionId.title}</h3>
            <p className="text-gray-600 mb-4">{answer.questionId.description}</p>

            <Editor height="300px" language="javascript" theme="vs-dark" value={answer.code || ''} onChange={(value) => handleCodeChange(index, value)} className="rounded border" options={{ fontSize: 14, minimap: { enabled: false }, }}  />

            <div className="text-right mt-4">
              <button onClick={() => handleSave(index)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Save Code
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 z-10">
        <button onClick={handleSubmit} className="bg-black text-white px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition" > Submit Test </button>
      </div>
    </div>
  );
}
