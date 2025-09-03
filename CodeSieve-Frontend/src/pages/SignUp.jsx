import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpValidation } from '../utils/yup';
import { useDispatch } from 'react-redux';
import { SignUpData } from '../Slice/AuthSlice';
import { useNavigate, Link } from 'react-router-dom';
import { SignUpService } from '../Service/AuthService';
import s1 from '../../public/s2.png?url';
import logo from '../../public/Logo.png?url'

export default function SignUp() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignUpValidation)
  });

  const handleClick = async (formData) => {
    try {
      const res = await SignUpService(formData);
      localStorage.setItem('token', res.token);
      dispatch(SignUpData({ user: res.user, token: res.token }));
      setMessage('SignUp Successful');
      navigate('/home');
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-white/90 backdrop-blur shadow-sm z-50 ">
        <img src={logo} alt="Logo" className='h-15' />
        <Link to="/" className="px-4 py-2 text-lg font-medium text-black hover:text-blue-300" > Sign in </Link>
      </nav>
      <div className="relative w-full min-h-screen mt-10 bg-white flex items-center justify-center overflow-hidden">
        <img src={s1} alt="background" className="absolute top-0 left-0 w-full h-full lg:w-270 lg:h-140 object-cover rounded-lg opacity-10 pointer-events-none select-none" />

        <div className="absolute top-6 left-6 z-20">
          <h1 className="text-3xl font-bold text-black lg:text-5xl">CodeSieve</h1>
          <p className="text-gray-800 text-sm mt-1 lg:text-xl">Candidate code evaluation</p>
        </div>

        <div className="relative z-30 lg:ml-210 w-full max-w-sm bg-white shadow-2xl rounded-xl p-6 mx-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create your account</h2>

          <form onSubmit={handleSubmit(handleClick)} className="space-y-5">
            <div>
              <input type="text" placeholder="Name" {...register('name')} className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black" />
              {errors.name && (<p className="mt-1 text-xs text-red-600">{errors.name.message}</p>)}
            </div>

            <div>
              <input type="email" placeholder="Email" {...register('email')} className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black" />
              {errors.email && (<p className="mt-1 text-xs text-red-600">{errors.email.message}</p>)}
            </div>

            <div className="relative">
              <input type={visible ? 'text' : 'password'} placeholder="Password" {...register('password')} className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black" />
              <button type="button" className="absolute right-3 top-2 text-xs text-gray-600 hover:text-black" onClick={() => setVisible(!visible)}>
                {visible ? 'Hide' : 'Show'}
              </button>
              {errors.password && (<p className="mt-1 text-xs text-red-600">{errors.password.message}</p>)}
            </div>

            <div>
              <select {...register('role')} className="w-full border border-gray-300 px-3 py-2 text-sm rounded bg-white focus:outline-none focus:ring-2 focus:ring-black">
                <option value="">Select Role</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Candidate">Candidate</option>
              </select>
              {errors.role && (<p className="mt-1 text-xs text-red-600">{errors.role.message}</p>)}
            </div>

            <button type="submit" className="w-full bg-black text-white text-sm py-2 font-medium rounded hover:opacity-90 transition"> Sign Up </button>
            {message && (<p className={`text-sm text-center ${message === 'SignUp Successful' ? 'text-green-600' : 'text-red-600'}`}>{message}</p>)}
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account? <Link to="/" className="text-black font-medium hover:underline">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
