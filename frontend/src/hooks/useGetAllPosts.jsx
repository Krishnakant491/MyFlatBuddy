import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllPost } from "@/redux/postSlice"
const useGetAllPosts = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.post);
    const { token } = useSelector(store => store.auth);
    useEffect(() => {
        const fetchGetAllPosts = async () => {
            try {
                console.log('Fetching posts...');
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getallposts?keyword=${searchedQuery}`, { headers: { "authorization": `bearer ${token}` }, withCredentials: true });
                // console.log('API Response:', res.data);
                if (res.data.success) {
                    // console.log('Posts:', res.data.posts);
                    dispatch(setAllPost(res.data.posts));
                }
            } catch (error) {
                console.log('Error:', error.message);
            }
        };
        fetchGetAllPosts();
    }, []);

}

export default useGetAllPosts