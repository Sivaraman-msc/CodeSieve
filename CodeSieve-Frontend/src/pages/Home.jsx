import React from 'react';
import { useSelector } from 'react-redux';
import cookie from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import AddQuestion from './Recruiter/AddQuestion';
import GetQuestion from './Recruiter/GetQuestion';
import AddInterview from './Recruiter/AddInterview';
import GetInterview from './Recruiter/GetInterview';
import ViewSubmission from './Recruiter/ViewSubmission';
import StartTest from './Candidate/StartTest';

export default function Home() {
  const navigate=useNavigate()

  const logout=()=>{
    cookie.remove('token')
    navigate('/')

  }
  const user = useSelector((state) => state.auth.user);
  if (!user) return <div>Loading user...</div>;

  return (
    <>
    <button onClick={logout}>Logout</button>
      {user.role === 'Recruiter' ? (
        <>
          <AddQuestion />
          <GetQuestion />
          <AddInterview />
          <GetInterview />
          <ViewSubmission />
        </>
      ) : user.role === 'Candidate' ? (
        <>
          <StartTest />
        </>
      ) : (
        <p>Unknown role: access denied</p>
      )}
    </>
  );
}
