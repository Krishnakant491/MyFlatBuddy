import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { RadioGroupItem } from '@radix-ui/react-radio-group'
import { Checkbox } from '../ui/checkbox'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'

const Signup = () => {
  const navigate = useNavigate()
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    role: '',
    email: '',
    phone: '',
    password: '',

  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    // Prepare the form data as a plain object
    const formdata = {
      firstName: input.firstName,
      lastName: input.lastName,
      dob: input.dob,
      role: input.role,
      email: input.email,
      phoneNumber: input.phone,
      password: input.password,
    };

    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, formdata);
      if (response.data.success == true) {
        toast.success(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occurred, please try again.');
    } finally {
      dispatch(setLoading(false))
    }
  };




  return (
    <div className='flex justify-center items-center p-5 min-h-[80vh] w-full mx-auto'>

      <div className='flex  flex-col items-center justify-center max-w-5xl sm:w-full '>
        <h1 className='mr-auto mb-1'>Already Have an account? <Link to="/login" className='text-blue-600 hover:text-blue-800'>Login here</Link></h1>
        <form onSubmit={submitHandler} className=' border border-black md:border-none p-5 rounded-sm flex flex-col justify-center gap-3  w-2/2 sm:w-full '>
          <h1 className='text-3xl mx-auto font-semibold' >Sign up</h1>

          <div className='flex  gap-3'>
            <div className='w-1/2'>
              <Label>First Name</Label>
              <Input type='text' value={input.firstName} onChange={changeEventHandler} name="firstName" placeholder='John' className='border border-black px-2' />
            </div>
            <div className='w-1/2'>
              <Label>Last Name</Label>
              <Input type='text' value={input.lastName} onChange={changeEventHandler} name="lastName" placeholder='Doe' className='border border-black px-2' />
            </div>
          </div>


          <div className='flex flex-col justify-between gap-3'>
            <Label>Date of Birth</Label>
            <Input type='date' value={input.dob} onChange={changeEventHandler} name="dob" placeholder='example@gmail.com' className='border border-black ' />
          </div>

          <div className='flex flex-col'>
            <span className='font-semibold'>Are you a Student or a Employee?</span>
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="employee"
                  className="cursor-pointer"
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Employee</Label>
              </div>
            </RadioGroup>
          </div>


          <div className='flex flex-col justify-between gap-3'>
            <Label>Email</Label>
            <Input type='text' value={input.email} onChange={changeEventHandler} name="email" placeholder='example@gmail.com' className='border border-black px-2' />
          </div>

          <div className='flex flex-col justify-between gap-3'>
            <Label>Phone Number</Label>
            <Input type='number' value={input.phone} onChange={changeEventHandler} name="phone" placeholder='000000000' className='border border-black px-2' />
          </div>

          <div className='flex flex-col justify-between gap-3'>
            <Label>Password</Label>
            <Input type='password' value={input.password} onChange={changeEventHandler} name="password" placeholder='**********' className='border border-black px-2' />
          </div>
          <div className='flex gap-2'>
            <Checkbox id="terms1" />
            <div className='flex flex-col'>
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
          {
            loading ? <Button><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type="submit">Sign up</Button>
          }
        </form>
      </div>

    </div>
  )
}

export default Signup