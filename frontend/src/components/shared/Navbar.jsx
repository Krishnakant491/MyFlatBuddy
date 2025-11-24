import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Bookmark, LockIcon, LogOut, Menu, Pen, PlusCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(null));
                localStorage.removeItem("token");
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.res?.data?.message);
        }
    };

    return (
        <div className=' backdrop-blur-sm  w-full border-b-2'>
            <div className='flex items-center justify-between mx-auto px-5 h-16 max-w-7xl'>
                <div>
                    <h1 className='font-semibold text-orange-600 text-2xl'>MyFlatBuddy</h1>
                </div>
                <ul className='flex gap-5 '>
                    <li className='text-lg font-medium text-black hover:text-orange-600 hidden md:block'><Link to='/'>Home</Link></li>
                    <li className='text-lg font-medium text-black hover:text-orange-600 hidden md:block'><Link to='/about'>About</Link></li>
                    <li className='text-lg font-medium text-black hover:text-orange-600 hidden md:block'><Link to='/listings'>Listings</Link></li>
                    <li className='text-lg font-medium text-black hover:text-orange-600 hidden md:block'><Link to='/blog'>Blogs</Link></li>
                    <li className='text-lg font-medium text-black hover:text-orange-600 hidden md:block'><Link to='/contact'>Contact Us</Link></li>
                </ul>

                {
                    !user ?
                        (
                            <ul className='flex gap-3'>
                                <li><Link to='/login'><Button>Login</Button></Link></li>
                                <li><Link to="/signup"><Button variant="outline">Signup</Button></Link></li>
                            </ul>
                        ) :
                        (
                            <ul className='flex gap-3'>
                                <li>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src='https://i.pinimg.com/564x/c7/ab/cd/c7abcd3ce378191a3dddfa4cdb2be46f.jpg' />
                                            </Avatar>
                                        </PopoverTrigger>

                                        <PopoverContent className='p-3 w-48 bg-white rounded-sm border-black border'>
                                            <h1 className='font-bold mt-2'>Hi, {user.firstName}</h1>
                                            <hr className='my-4' />
                                            <div className='flex flex-col justify-center items-start gap-3'>
                                                <div className='flex gap-2'>
                                                    <Link to="/post" className='flex gap-2 cursor-pointer'>
                                                        <PlusCircle />
                                                        <h1 className='font-semibold cursor-pointer'>Add Post</h1>
                                                    </Link>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <Link to="/applied-post" className='flex gap-2 cursor-pointer'>
                                                        <Bookmark />
                                                        <h1 className='font-semibold cursor-pointer'>Applied Posts</h1>
                                                    </Link>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <Link to="/profile" className='flex gap-2 cursor-pointer'>
                                                        <Pen />
                                                        <h1 className='font-semibold cursor-pointer'>View Profile</h1>
                                                    </Link>
                                                </div>

                                                <div className='flex gap-2 cursor-pointer' onClick={logoutHandler}>
                                                    <LogOut />
                                                    <h1 className='font-semibold cursor-pointer'>Logout</h1>
                                                </div>
                                            </div>
                                        </PopoverContent>

                                    </Popover>

                                </li>

                            </ul>
                        )
                }

                {/* <ul>
                    <li className='flex items-center'>
                        <Menu size={34} strokeWidth={2.5} />
                    </li>
                </ul> */}





            </div>
        </div>
    )
}

export default Navbar