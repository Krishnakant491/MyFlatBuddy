import getAppliedPosts from '@/hooks/useGetAppliedPosts'
import React from 'react'
import { useSelector } from 'react-redux'
import PostsCard from './PostsCard'

const AppliedPosts = () => {
    getAppliedPosts()
    const appliedPosts= useSelector((store)=>store.post.allAppliedPost)
    // console.log(appliedPosts)
    return (
    <div className='w-full flex justify-center items-center '>
        <div className='max-w-7xl my-10 flex flex-col items-center justify-center'>
            <h1 className='font-semibold text-2xl text-orange-600'>Applied Posts</h1>
           {
                appliedPosts.length===0 && <h1 className='text-lg text-gray-500 my-24'>No Posts Applied</h1>
           } <div className='flex flex-col gap-5 max-w-2xl mt-5'>
                {appliedPosts.map((posts)=>(
                    <PostsCard
                    id={posts.post._id} // Use post.id if available, otherwise fallback to index
                    images={posts.post.images}
                    address={posts.post.address}
                    state={posts.post.state}
                    city={posts.post.city}
                    postCode={posts.post.postCode}
                    vacancy={posts.post.vacancy}
                    bhk={posts.post.bhk}
                    rent={posts.post.rent}
                    gender={posts.post.gender}
                    user={posts.post.created_by}
                    />
                    
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default AppliedPosts