import React, { useState } from 'react';
// import room from "../cards/room.jpg"
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import no_img_avl from '../assets/no_img_avl.jpg';
import { Link } from 'react-router-dom';
const PostsCard = ({ images, address, state, city, postCode, vacancy, rent, gender, user, id }) => {

  if (images.length === 0) {
    images = [no_img_avl];
  }
  return (
    <div className='flex flex-col w-full shadow-lg hover:shadow-xl transition-shadow border border-gray-400 border-0.1 rounded-xl'>
      <div className='flex gap-2 h-48'>
        <img src={images[0]} alt="Room" className='w-[35%] h-full object-cover rounded-lg rounded-r-none rounded-b-none' />
        <div className='flex flex-col p-2 flex-1 justify-between'>
          <div>
            <h1 className='font-medium text-base'>{user.firstName} {user.lastName}</h1>
            <p className='text-sm line-clamp-2 overflow-hidden'>
              {address}, {state}, {city} - {postCode}
            </p>
          </div>
          <div className='flex mt-2 justify-around'>
            <div className='flex justify-center flex-col items-center'>
              <h1 className='font-semibold text-sm'>Vacancy</h1>
              <h1 className='font-medium text-sm'>{vacancy}</h1>
            </div>

            <div className='flex justify-center flex-col items-center'>
              <h1 className='font-semibold text-sm'>BHK</h1>
              <h1 className='font-medium text-sm'>2</h1>
            </div>

            <div className='flex justify-center flex-col items-center'>
              <h1 className='font-semibold text-sm'>Rent</h1>
              <h1 className='font-medium text-sm'>{rent}</h1>
            </div>

            <div className='flex justify-center flex-col items-center'>
              <h1 className='font-semibold text-sm'>Gender</h1>
              <h1 className='font-medium text-sm'>{gender}</h1>
            </div>
          </div>
        </div>
      </div>
      <hr className='w-[95%] h-0.5 my-2 bg-gray-500 mx-auto' />
      <div className='flex w-full gap-4 px-4 pb-2'>
        <Button className="ml-auto" variant="outline">
          <Bookmark /> Save
        </Button>
        <Link to={`/post/${id}`}><Button className="bg-blue-600 hover:bg-blue-700">Connect</Button></Link>
      </div>
    </div>
  );
};

export default PostsCard;
