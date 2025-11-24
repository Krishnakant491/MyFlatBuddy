import { setAllAppliedPost } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"



const getAppliedPosts = async () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getapplied`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                });
                // console.log( "Applied",res.data);
                if (res.data.success) {
                    dispatch(setAllAppliedPost(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedPosts();
    }, [])
}

export default getAppliedPosts;