import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ApplicantsTable from './ApplicantsTable';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const applicants = useSelector((store) => store.applications.applicants);
    // console.log(applicants)
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${params.id}/applicants`,
                    {
                        headers: {
                            "authorization": `Bearer ${token}`
                        },
                        withCredentials: true
                    });

                dispatch(setAllApplicants(res.data.post.applications));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Total Applicants: {applicants?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants