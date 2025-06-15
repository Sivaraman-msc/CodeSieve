import axios from 'axios';
import cookie from 'js-cookie'

const BASE_URL = 'http://localhost:3000/CodeSieve/Question';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${cookie.get('token')}`,
  },
});

export const AddQuestionService = async (formdata) => {
  try {
    const res = await axios.post(`${BASE_URL}/addQuestion`, formdata, getAuthHeader());
    return res.data;
  } catch (err) {
    console.error("AddQuestionService error:", err);
    throw err;
  }
};

export const GetQuestionService=async()=>{
    try{
        const res=await axios.get(`${BASE_URL}/getQuestion`,getAuthHeader())
        return res.data
    }catch(err){
        console.log(err)
        throw err
    }
}
