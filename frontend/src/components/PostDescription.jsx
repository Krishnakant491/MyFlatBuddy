import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import no_img_avl from '../assets/no_img_avl.jpg';
import useGetAllPosts from '@/hooks/useGetAllPosts';
import { Button } from './ui/button';
import { setSinglePost } from '@/redux/postSlice';
import axios from 'axios';
import { toast } from 'sonner';

const PostDescription = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useGetAllPosts();
    const allPosts = useSelector((store) => store.post.allPost);
    const user = useSelector(store => store.auth.user);
    // Find the post based on the ID
    const singlePost = allPosts.find(post => post._id === id);

    const [isApplied, setIsApplied] = useState(false);
    const token = localStorage.getItem('token');

    const applyPostHandler = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/apply/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                    "id": user._id
                },
                withCredentials: true
            });
            if (response.data.success) {
                // console.log(response.data);
                // dispatch(setSinglePost(response.data.post));
                if (response.data.message === 'Applied successfully' || response.data.message === 'Already applied') {
                    setIsApplied(true);
                }
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    // If post not found, show message
    if (!singlePost) {
        return (
            <div className='p-5'>
                <h1 className='text-2xl font-semibold text-center'>Post not found</h1>
            </div>
        );
    }
    var image = singlePost.images;
    // Ensure images array exists or use a default image
    if (!singlePost.images || singlePost.images.length === 0) {
        image = [no_img_avl];
    }
    const formattedDate = new Date(singlePost.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className='w-full'>
            <div className='flex flex-col' >
                <div>
                    {/* Address with connect btn. use space between */}
                    <div className='flex justify-between items-center  bg-[#030303] p-5 px-10'>
                        <div className='text-white text-lg md:text-2xl'>
                            <p>{singlePost.address},</p>
                            <p>{singlePost.landmark},</p>
                            <p>{singlePost.city}- {singlePost.postCode},</p>
                            <p>{singlePost.state}.</p>

                        </div>
                        <div className='flex flex-col justify-center items-center gap-4 text-white'>
                            <h1 className='text-2xl'>₹ {singlePost.rent}</h1>
                            {
                                isApplied ? <Button variant="outline" className=" bg-blue-500 md:text-lg text-white">Applied</Button> : <Button onClick={applyPostHandler} variant="outline" className=" bg-green-600 md:text-lg text-white">Connect</Button>
                            }


                        </div>

                    </div>
                </div>
                <div className='flex items-center justify-items-center p-3 flex-wrap gap-2 w-full'>
                    <div className=' md:max-w-2xl md:mx-auto p-2'>
                        {/* img */}
                        <div className='w-full h-auto  rounded-lg overflow-hidden outer-img'>
                            <img
                                src={image}
                                className="w-full h-auto object-cover rounded-lg inner-img"
                                alt="Post"
                            />
                        </div>

                    </div>
                    <div className='w-full md:w-[50%] flex flex-col justify-center items-center gap-5 md:mx-auto p-4'>
                        {/* Details or Features */}
                        <div className='shadow-lg w-full flex flex-wrap rounded-lg'>
                            {/* Rent */}
                            <div className='w-full md:w-1/4 border p-4 px-5 flex flex-col items-center justify-center mb-4 md:mb-0'>
                                <h1 className="text-lg font-semibold">Gender</h1>
                                <h2 className="text-xl font-bold">{singlePost.gender}</h2>
                            </div>
                            {/* Vacancy */}
                            <div className='w-full md:w-1/4 border p-4 px-5 flex flex-col items-center justify-center mb-4 md:mb-0'>
                                <h1 className="text-lg font-semibold">Vacancy</h1>
                                <h2 className="text-xl font-bold">{singlePost.vacancy}</h2>
                            </div>
                            {/* BHK */}
                            <div className='w-full md:w-1/4 border p-4 px-5 flex flex-col items-center justify-center mb-4 md:mb-0'>
                                <h1 className="text-lg font-semibold">BHK</h1>
                                <h2 className="text-xl font-bold">{singlePost.bhk}</h2>
                            </div>
                            {/* Possession By */}
                            <div className='w-full md:w-1/4 border p-4 px-5 flex flex-col items-center justify-center mb-4 md:mb-0'>
                                <h1 className="text-lg font-semibold">Possession By</h1>
                                <h2 className="text-xl font-bold">{singlePost.possessionBy}</h2>
                            </div>
                        </div>

                        {/* Description (Optional section) */}
                        <div className='mt-6 w-full p-3 '>
                            <h2 className='text-2xl font-semibold mb-2 text-orange-600'>Description</h2>
                            <div className='flex gap-2  mb-2'>
                                <h3 className='text-xl font-semibold text-cyan-800'>Address- </h3>
                                <p className='font-medium text-lg'>{singlePost.address}, {singlePost.landmark}, {singlePost.city}- {singlePost.postCode}, {singlePost.state}.</p>
                            </div>
                            <div className='flex gap-2 mb-2'>
                                <h3 className='text-xl font-semibold text-cyan-800'>Posted on- </h3>
                                <p className='font-medium text-lg'> {formattedDate} </p>
                            </div>
                            <div className='flex gap-2 mb-2'>
                                <h3 className='text-xl font-semibold text-cyan-800'>Posted By- </h3>
                                <p className='font-medium text-lg'> {singlePost.created_by.firstName} {singlePost.created_by.lastName} &#40; {singlePost.created_by.role} &#41; </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center md:items-center gap-4 p-5'>
                <h1 className='text-red-500'>Disclamer! By clicking on "Connect" your are applying and sharing your Phone Number with the host.</h1>
                <p className='text-red-500'>The host may later contact you to share more details about the Advertisement.</p>
            </div>
        </div>
    )
};

export default PostDescription;
