import React from 'react'
import room from "../cards/room.jpg"
import no_img_avl from "../../assets/no_img_avl.jpg"
import { Button } from '../ui/button'
import { Bookmark, Edit } from 'lucide-react'
import { Link } from 'react-router-dom'

const MyPostsCard = ({images, address, landmark, state, city, postCode, gender, vacancy, bhk, rent,user, applicants, id}) => {
    if(images == ''){
        images = no_img_avl;   
    }
    return (
    <div className='flex flex-col my-4 md:max-w-2xl shadow-xl hover:shadow-2xl transition-shadow border border-gray-400 border-0.1 rounded-xl overflow-hidden '>
    <div className='flex gap-2'>
        <img src={images} className='w-[30%] object-cover  rounded-lg rounded-r-none rounded-b-none ' />
        <div className='flex flex-col p-2'>
            <h1 className='font-medium'>{user.firstName} {user.lasName}</h1>
            <p>{address}, {landmark}, {state}, {city}- {postCode}</p>
            <div className='flex mt-2 justify-around'>
                <div className='flex justify-center flex-col items-center '>
                    <h1 className='font-semibold'>Total Bed's</h1>
                    <h1 className='font-medium'>{vacancy}</h1>
                </div>

                <div className='flex justify-center flex-col items-center '>
                    <h1 className='font-semibold'>BHK</h1>
                    <h1 className='font-medium'>{bhk}</h1>
                </div>

                <div className='flex justify-center flex-col items-center '>
                    <h1 className='font-semibold'>Rent</h1>
                    <h1 className='font-medium'>{rent}</h1>
                </div>

                <div className='flex justify-center flex-col items-center '>
                    <h1 className='font-semibold'>Gender</h1>
                    <h1 className='font-medium'>{gender}</h1>
                </div>
            </div>
        </div>
    </div>
    <hr className='w-[95%] h-0.5 my-2 bg-gray-500 mx-auto ' />
    <div className='flex w-full gap-4 px-4 pb-2'>
        <Link to={`/view-applicants/${id}`} state={applicants} className='ml-auto'><Button className="ml-auto bg-blue-500 hover:bg-blue-600 ">View Applicants</Button></Link>
        <Link to={`/update/${id}`}><Button className=" bg-green-600  hover:bg-green-700"><Edit/> Edit</Button></Link>
    </div>
</div>
  )
}

export default MyPostsCard