import React, { useEffect, useState } from 'react';
import { GetSubmissionById, SaveAnswerCode, SubmitTest } from '../../Service/CandidateService';
import cookie from 'js-cookie';
import Editor from '@monaco-editor/react';

export default function SaveTest() {
  const [submission, setSubmission] = useState(null);
  const [message, setMessage] = useState('');
  const submissionId = cookie.get('submissionId');

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
  } catch (err) {
    console.error('Error submitting test:', err);
    setMessage('Failed to submit test.');
  }
};

  if (!submission) return <div>{message || 'Loading...'}</div>;

  return (
    <div>
      <h2>Code Challenge</h2>

      {submission.answers.map((answer, index) => (
        <div key={answer.questionId._id} style={{ marginBottom: '3rem' }}>
          <h3>{answer.questionId.title}</h3>
          <p>{answer.questionId.description}</p>

          <Editor
            height="300px"
            language="javascript"
            theme="vs-dark"
            value={answer.code || ''}
            onChange={(value) => handleCodeChange(index, value)}
          />

          <button onClick={() => handleSave(index)} style={{ marginTop: '1rem' }}>
            Save Code
          </button>
        </div>
      ))}

      <button onClick={handleSubmit} style={{ marginTop: '2rem' }}>
        Submit Test
      </button>

      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
