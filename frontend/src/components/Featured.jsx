import React from 'react'
import room from "../assets/room.jpg"
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import FeaturedCard from './cards/FeaturedCard'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import useGetAllPosts from '@/hooks/useGetAllPosts'
import { useSelector } from 'react-redux'

const Featured = () => {
  useGetAllPosts();
  const allPosts = useSelector((store) => store.post.allPost);
  const user = useSelector(store => store.auth)
  const filteredPosts = allPosts.filter((post) => post.created_by?._id !== user?.user?._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div className='w-full flex flex-col px-5 my-10 overflow-hidden'>
      <h1 className='text-xl text-left font-medium text-slate-700'>Recent Posts</h1>
      <div className='flex w-full mx-auto flex-wrap my-3 items-center justify-center gap-6'>

        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1290: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          loop={true}
          className='mySwiper'
        >
          {
            filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.slice(0, 4).map((post) => (
                <SwiperSlide className="mb-12 mt-4" key={post._id}>
                  <FeaturedCard
                    id={post?._id}
                    images={post.images}
                    address={post.address}
                    landmark={post.landmark}
                    state={post.state}
                    city={post.city}
                    postCode={post.postCode}
                    vacancy={post.vacancy}
                    bhk={post.bhk}
                    gender={post.gender}
                    rent={post.rent}
                    user={post.created_by}
                  />
                </SwiperSlide>
              ))
            ) : (
              <div>No posts available</div>
            )
          }

        </Swiper>



      </div>
    </div >
  )
}

export default Featured