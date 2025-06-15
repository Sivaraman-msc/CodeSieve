import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpValidation } from '../utils/yup'
import { SignUpService } from '../Service/AuthService'
import { SignUpData } from '../Slice/AuthSlice'
import cookie from 'js-cookie'

export default function SignUp() {
    const[message,setmessage]=useState('')
    const [visible,setvisible]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(SignUpValidation)})

    const passVisible=()=>{
        setvisible(!visible)
    }
    const handleClick=async(formdata)=>{
        try{
            const res=await SignUpService(formdata)
            console.log(`SignUp response : ${res}`)
            dispatch(SignUpData({user:res.user,token:res.token}))
            cookie.set('token',res.token)
            setmessage('SignUp Successfull')
            navigate('/home')
        }catch(err){
            console.log(err)
            setmessage('Something went wrong')
        }
    }
  return (
    <>
    <form onSubmit={handleSubmit(handleClick)}>
        <input type="text" name='name' {...register('name')}  />
        {errors.name?.message && <p>{errors.name?.message}</p> }
        <input type="email" name='email' {...register('email')}  />
        {errors.email?.message && <p>{errors.email?.message}</p> }
        <input type={visible?"text":"password"} name='password' {...register('password')} />
        <button onClick={passVisible}>{visible?"Hide":"Show" }</button>
        {errors.password?.message && <p>{errors.password?.message}</p> }
        <select name='role' {...register('role')}>
            <option value="">Select Role</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Candidate">Candidate</option>
        </select>
        {errors.role?.message && <p>{errors.role?.message}</p> }
        <button type='submit'>SignUp</button>
    </form>
    {message && <p>{message}</p>}
    <Link to='/'>Already have an account ? Login</Link>
    </>
  )
}
