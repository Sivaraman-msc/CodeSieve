import { useEffect, useState } from 'react'
import './App.css'
import './index.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SaveTest from './pages/Candidate/SaveTest'
import CodeEditor from './Components/CodeEditor';

function App() {
  useEffect(()=>{
    fetch('http://localhost:3000/')
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  },[])

  return ( 
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/startTest' element={<SaveTest />} />
        <Route path='/codeEditor' element={<CodeEditor /> } />
      </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
