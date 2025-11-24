import React, { useState } from 'react';
import axios from 'axios';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const input = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    const logoutHandler = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(null));
          localStorage.removeItem('token');
          navigate('/login');
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
      }
    };

    try {
      const token = localStorage.getItem('token'); // Ensure you have token to send
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/profile/change-password`,
        input,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res?.data?.message);
        logoutHandler();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto flex justify-center items-center p-4 my-12">
        <form
          className="flex flex-col w-[80%] gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Change Password
          </button>

          {message && <p className="text-center mt-4 text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
