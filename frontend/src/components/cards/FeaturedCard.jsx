import React from 'react'
// import room from "../cards/room.jpg"
import no_img_avl from "../../assets/no_img_avl.jpg"
import { Link } from 'react-router-dom';
// import no_img_avl from '../assets/no_img_avl.jpg'; // Placeholder image
import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';

const FeaturedCard = ({ images, address, landmark, state, city, postCode, gender, vacancy, bhk, rent, id }) => {
  // Fallback for missing images
  const imageSrc = images && images.length > 0 ? images[0] : no_img_avl;

  return (
    <div className='flex flex-col shadow-xl hover:shadow-2xl transition-shadow border border-gray-400 rounded-xl overflow-hidden'>
      {/* Image and Details Section */}
      <div className='flex gap-2'>
        <img
          src={imageSrc}
          alt='Room'
          className='w-[35%] object-cover rounded-lg rounded-r-none rounded-b-none'
        />
        <div className='flex flex-col p-2'>
          <h1 className='font-medium'>{address}</h1>
          <p>
            {landmark}, {state}, {city} - {postCode}
          </p>
          <div className='flex mt-2 justify-around'>
            {/* Vacancy */}
            <div className='flex justify-center flex-col items-center'>
              <h1 className='font-semibold'>Total Beds</h1>
              <h1 className='font-medium'>{vacancy}</h1>
            </div>

            {/* BHK */}
            <div className='flex justify-center flex-col items-center'>
              <h1 className='font-semibold'>BHK</h1>
              <h1 className='font-medium'>{bhk}</h1>
            </div>

            {/* Rent */}
            <div className='flex justify-center flex-col items-center'>
              <h1 className='font-semibold'>Rent</h1>
              <h1 className='font-medium'>{rent}</h1>
            </div>

            {/* Gender */}
            <div className='flex justify-center flex-col items-center'>
              <h1 className='font-semibold'>Gender</h1>
              <h1 className='font-medium'>{gender}</h1>
            </div>
          </div>
        </div>
      </div>
      <hr className='w-[95%] h-0.5 my-2 bg-gray-500 mx-auto' />
      {/* Action Buttons */}
      <div className='flex w-full gap-4 px-4 pb-2'>
        <Button className='ml-auto' variant='outline'>
          <Bookmark /> Save
        </Button>
        <Link to={`/post/${id}`}>
          <Button className='bg-blue-600 hover:bg-blue-700'>Connect</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCard;
