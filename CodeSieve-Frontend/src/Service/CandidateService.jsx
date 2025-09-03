import axios from 'axios';

const BASE_URL = 'http://localhost:3000/CodeSieve/Submission';

const getAuthHeader = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`
  },
});

export const StartTestService = async (formdata) => {
  try {
    const res = await axios.post(`${BASE_URL}/startTest`, formdata, getAuthHeader());
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const GetSubmissionById = async (submissionId) => {
  try {
    const res = await axios.get(`${BASE_URL}/submission/${submissionId}`, getAuthHeader());
    return res.data;
  } catch (err) {
    console.error('Error fetching submission:', err);
    throw err;
  }
};

export const SaveAnswerCode = async ({ submissionId, questionId, code }) => {
  try {
    const res = await axios.post(`${BASE_URL}/saveTest`, { submissionId, questionId, code }, getAuthHeader());
    return res.data;
  } catch (err) {
    console.error('Error saving answer:', err);
    throw err;
  }
};

export const SubmitTest = async ({ submissionId }) => {
  try {
    const res = await axios.post(`${BASE_URL}/submitTest`, { submissionId }, getAuthHeader());
    return res.data;
  } catch (err) {
    console.error('Error submitting test:', err);
    throw err;
  }
};
