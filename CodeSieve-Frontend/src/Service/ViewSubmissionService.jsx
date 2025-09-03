import axios from 'axios';

const BASE_URL = 'http://localhost:3000/CodeSieve/Data';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const ViewSubmissionService = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/submissions`, getAuthHeader());
    return res.data;
  } catch (err) {
    console.error('ViewSubmissionService Error:', err);
    throw err;
  }
};
