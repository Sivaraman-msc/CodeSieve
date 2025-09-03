import axios from 'axios';

const BASE_URL = 'http://localhost:3000/CodeSieve/Interview';

const getAuthHeader = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const CreateInterviewService = async (formdata) => {
  try {
    const res = await axios.post(`${BASE_URL}/createInterview`, formdata, getAuthHeader());
    return res.data;
  } catch (err) {
    console.log('CreateInterviewService Error:', err);
    throw err;
  }
};

export const GetInterviewService = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getInterview`, getAuthHeader());
    return res.data;
  } catch (err) {
    console.log('GetInterviewService Error:', err);
    throw err;
  }
};
