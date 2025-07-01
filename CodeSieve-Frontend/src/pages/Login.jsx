import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidation } from '../utils/yup';
import { useDispatch } from 'react-redux';
import { AuthService } from '../Service/AuthService';
import { login } from '../Slice/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import s1 from '../../public/s2.png'; 

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(LoginValidation) });

  const onSubmit = async (formData) => {
    try {
      const res = await AuthService(formData);
      cookie.set('token', res.token);
      dispatch(login({ user: res.user, token: res.token }));
      setMessage('Login Successful');
      navigate('/home');
    } catch (err) {
      setMessage('Login Failed');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <img src={s1} alt="background" className="absolute top-0 left-0 w-full h-full lg:w-270 lg:h-140 object-cover rounded-lg opacity-10 pointer-events-none select-none" />

      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-3xl font-bold text-black lg:text-5xl">CodeSieve</h1>
        <p className="text-gray-800 text-sm mt-1 lg:text-xl">Candidate code evaluation</p>
      </div>

      <div className="relative z-30 lg:ml-210 w-full max-w-sm bg-white shadow-2xl rounded-xl p-6 mx-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login page</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input type="email" {...register('email')} className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="email@gmail.com"/>
            {errors.email && ( <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>)}
          </div>

          <div className="relative">
            <input type={visible ? 'text' : 'password'} {...register('password')} className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your password"/>
            <button type="button" onClick={() => setVisible(!visible)} className="absolute right-3 top-2 text-xs text-gray-500 hover:text-black">
              {visible ? 'Hide' : 'Show'}
            </button>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded text-sm font-medium hover:opacity-90">Sign In</button>
          {message && (
            <p className={`text-sm text-center ${ message === 'Login Successful' ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
          )}
        </form>

        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-black font-medium hover:underline">Create one</Link>
        </div>
      </div>
    </div>
  );
}
