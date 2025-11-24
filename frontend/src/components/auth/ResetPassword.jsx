import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate()
  // This will extract the token from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('resettoken');

  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== checkPassword) {
      return toast.error('Passwords do not match!');
    }

    try {
      // console.log(resetToken)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/reset-password?resettoken=${resetToken}`, // Pass token in the URL
        { password }, // Send password in the request body
        { headers: { 'Content-Type': 'application/json' } } // Set content type
      );

      if (response.data.message) {
        toast.success(response.data.message);
        navigate('/login')
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || 'An error occurred.');
    }
  };


  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='flex flex-col justify-center items-center max-w-7xl my-10 gap-5'>
        <h1 className='text-2xl text-orange-500'>Reset Password</h1>
        <form onSubmit={submitHandler} className='w-full flex flex-col justify-center items-center gap-5'>
          <div className='flex justify-between items-center gap-2 w-96'>
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              className="w-2/3"
            />
          </div>
          <div className='flex justify-between items-center gap-2 w-96'>
            <Label htmlFor="check-password">Check Password</Label>
            <Input
              type="password"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              id="check-password"
              name="check-password"
              className="w-2/3"
            />
          </div>
          <Button type="submit" className="bg-green-500 hover:bg-green-700 mb-5">Change Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
