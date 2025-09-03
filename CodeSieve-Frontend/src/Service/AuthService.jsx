import axios from 'axios'

const BASE_URL = 'http://localhost:3000/CodeSieve/Auth'

export const AuthService = async (formdata) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, formdata, {
      headers: { 'Content-Type': 'application/json' }
    });
    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (err) {
    console.log('Login Error:', err)
    throw err;
  }
}

export const SignUpService = async (formdata) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, formdata, {
      headers: { 'Content-Type': 'application/json' }
    });
    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (err) {
    console.log('SignUp Error:', err);
    throw err;
  }
}
