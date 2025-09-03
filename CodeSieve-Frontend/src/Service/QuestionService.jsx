import axios from 'axios';

const BASE_URL = 'http://localhost:3000/CodeSieve/Question';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const AddQuestionService = async (formdata) => {
  try {
    const res = await axios.post(`${BASE_URL}/addQuestion`, formdata, getAuthHeader());
    return res.data;
  } catch (err) {
    console.error('AddQuestionService Error:', err);
    throw err;
  }
};

export const GetQuestionService = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getQuestion`, getAuthHeader());
    return res.data;
  } catch (err) {
    console.error('GetQuestionService Error:', err);
    throw err;
  }
};
