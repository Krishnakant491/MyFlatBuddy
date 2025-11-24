import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()

  const { loading, user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = {
      email: input.email,
      password: input.password,
    }
    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, formData)
      if (response.data.success == true) {
        // After successful login, store the token
        localStorage.setItem("token", response.data.token);
        // console.log(response.data)
        toast.success(response.data.message)
        dispatch(setUser(response.data.user))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data.message)
    }
    finally {
      dispatch(setLoading(false))
    }
  }

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])

  return (
    <div className='flex justify-center items-center min-h-[70vh]'>
      <div className='flex max-w-7xl flex-col items-center justify-center'>

        <form onSubmit={submitHandler} className=' border border-black p-5 rounded-sm flex flex-col gap-5 shadow-xl '>
          <h1 className='text-3xl text-center font-semibold'>Login</h1>

          <div className='flex w-80 flex-col justify-between gap-4'>
            <Label>Email</Label>
            <Input type='text' value={input.email} onChange={changeEventHandler} name="email" placeholder='example@gmail.com' className='border border-black px-2' />
          </div>
          <div className='flex flex-col justify-between gap-4'>
            <Label>Password</Label>
            <Input type='password' value={input.password} onChange={changeEventHandler} name="password" placeholder='**********' className='border border-black px-2' />
          </div>
          {
            loading ? <Button><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type="submit">Login</Button>
          }
          <div className='flex justify-between'>
            <Link to='/signup' className=''>Not Registered yet?</Link>
            <Link to='/forgot-password' className='underline text-green-500'>Forgot password</Link>
          </div>
        </form>

      </div>

    </div>
  )
}

export default Login