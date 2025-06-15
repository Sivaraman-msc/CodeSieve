import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginValidation } from '../utils/yup'
import { useDispatch } from 'react-redux'
import { AuthService } from '../Service/AuthService'
import { login } from '../Slice/AuthSlice'
import { Link, useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'

export default function Login() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(LoginValidation) })

  const onSubmit = async (formData) => {
    try {
      const res = await AuthService(formData)
      console.log('Login Response:', res)
      cookie.set("token", res.token);
      dispatch(login({ user: res.user, token: res.token }))
      setMessage('Login Successful')
      navigate('/home')
    } catch (err) {
      console.log('Login Error:', err)
      setMessage('Login Failed')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email?.message && <p>{errors.email.message}</p>}

        <input
          type={visible ? 'text' : 'password'}
          placeholder="Password"
          {...register('password')}
        />
        {errors.password?.message && <p>{errors.password.message}</p>}

        <button type="button" onClick={() => setVisible(!visible)}>
          {visible ? 'Hide' : 'Show'}
        </button>

        <button type="submit">Login</button>

        {message && <p>{message}</p>}
      </form>
      <Link to='/signup'>Don't have an account ? SignUp</Link>
    </>
  )
}
