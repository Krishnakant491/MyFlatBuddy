import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllPosts from '@/hooks/useGetAllPosts';
import PostsCard from './PostsCard';
import PostFilter from './PostFilter';
import { use } from 'react';
import { setSearchedQuery } from '@/redux/postSlice';

const Listings = () => {
  useGetAllPosts();
  const allPosts = useSelector((store) => store.post.allPost); 
  const user = useSelector((store) => store.auth.user);
  const searchedQuery = useSelector((store) => store.post.searchedQuery);
  const dispatch = useDispatch();
  

  const [filters, setFilters] = useState({
    minRent: '',
    maxRent: '',
    gender: '',
    bhk: '',
    vacancy: '',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredPosts = allPosts
    ?.filter((post) => post.created_by?._id !== user?._id)
    ?.filter((post) => post.isActive) // Only active posts
    ?.filter((post) => {
      // Rent range filter
      const minRent = filters.minRent ? parseFloat(filters.minRent) : 0;
      const maxRent = filters.maxRent ? parseFloat(filters.maxRent) : Infinity;
      return post.rent >= minRent && post.rent <= maxRent;
    })
    ?.filter((post) => {
      // Gender filter
      if (filters.gender) {
        return filters.gender === 'any' || post.gender === filters.gender;
      }
      return true;
    })
    ?.filter((post) => {
      // BHK filter
      return filters.bhk ? parseInt(post.bhk) === parseInt(filters.bhk) : true;
    })
    ?.filter((post) => {
      // Vacancy filter
      return filters.vacancy
        ? parseInt(post.vacancy) >= parseInt(filters.vacancy)
        : true;
    });

      useEffect(()=>{
        dispatch(setSearchedQuery(''))
      })

  return (
    <div className=''>
      <div className='max-w-7xl mx-auto my-5'>
        <div className='flex gap-5 justify-center w-full flex-wrap'>
          <div className='md:w-[35%] w-full flex justify-center p-4'>
            <PostFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className='flex flex-col md:w-[60%] w-full h-auto md:max-h-screen scrollbar-hidden overflow-y-scroll items-center gap-5 p-3'>
            {filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostsCard
                  id={post._id}
                  images={post.images}
                  address={post.address}
                  state={post.state}
                  city={post.city}
                  postCode={post.postCode}
                  vacancy={post.vacancy}
                  bhk={post.bhk}
                  rent={post.rent}
                  gender={post.gender}
                  user={post.created_by}

                />
              ))
            ) : (
              <span>Post not found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
