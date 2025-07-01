import React from 'react';
import { useSelector } from 'react-redux';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import AddQuestion from './Recruiter/AddQuestion';
import GetQuestion from './Recruiter/GetQuestion';
import AddInterview from './Recruiter/AddInterview';
import GetInterview from './Recruiter/GetInterview';
import ViewSubmission from './Recruiter/ViewSubmission';
import StartTest from './Candidate/StartTest';

export default function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const logout = () => {
    cookie.remove('token');
    navigate('/');
  };

  if (!user) return <div>Loading user...</div>;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
          Welcome, {user.name}
        </h2>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"> Logout</button>
      </div>

      {user.role === 'Recruiter' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><AddQuestion /></div>
            <div><AddInterview /></div>
            <div><GetInterview /></div>
            <div><ViewSubmission /></div>
            <div className="sm:col-span-2 lg:col-span-2"><GetQuestion /></div>
          </div>
        </>
      ) : user.role === 'Candidate' ? (
        <StartTest />
      ) : (
        <p className="text-red-500 font-semibold">Unknown role: access denied</p>
      )}
    </div>
  );
}
