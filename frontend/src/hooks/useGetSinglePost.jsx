// import React from 'react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSinglePost } from "@/redux/postSlice"
import axios from 'axios'
import { useParams } from 'react-router-dom'


const useGetSinglePost = (id) => {

    // console.log(id)

    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchSinglePost = async () => {
            try {
                // console.log('Fetching posts...');
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getpostbyid/${id}`, {
                    headers: {
                        "authorization": `bearer ${token}`
                    }, withCredentials: true
                });
                // console.log('API Response:', res.data);
                if (res.data.success) {
                    // console.log('Posts:', res.data.posts);
                    dispatch(setSinglePost(res.data.posts));
                }
            } catch (error) {
                console.log('Error:', error.message);
            }
        };
        fetchSinglePost()
    }, []);
}

export default useGetSinglePost