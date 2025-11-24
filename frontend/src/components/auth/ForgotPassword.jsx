import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const changeEventHandler = (e) => {
        setEmail(e.target.value); // Update the email state when input changes
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        // Make an API call to send the reset password email
        const formData = {
            email: email
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/forgot-password`, formData)
            if (response.data.message) {
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data.message)
        }
    };

    return (
        <div className='flex justify-center items-center w-full'>
            <div className='max-w-7xl flex flex-col my-8'>
                <h1 className='text-center text-orange-500 text-2xl my-10'>Forgot Password?</h1>
                <form onSubmit={submitHandler} className='w-96 flex flex-col justify-center items-center gap-5'>
                    <div className='flex w-full justify-center items-center gap-2'>
                        <Label htmlFor="email" className="w-24">Enter Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={email} // Bind the email state to the input value
                            onChange={changeEventHandler} // Call changeEventHandler on input change
                            className="w-full"
                            placeholder="abc123@gmail.com"
                            required
                        />
                    </div>
                    <Button type="submit" className="bg-green-500 hover:bg-green-700 mb-5">Submit</Button>
                </form>
                <Link to="/signup" className='ml-auto text-blue-600 hover:text-blue-800'>Email not registerd?</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
