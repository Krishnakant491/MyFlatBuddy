import React from 'react'
import MyPostsCard from './cards/MyPostsCard'
import { useSelector } from 'react-redux';

const MyPosts = () => {
  const allPosts = useSelector((store) => store.post.allPost);
  const user= useSelector(store=>store.auth)
  const filteredPosts = allPosts.filter((post) => post.created_by?._id == user?.user?._id);
    const myPost= []
  return (
    <div className='flex flex-col justify-center items-center p-2 my-4'>
      {filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <MyPostsCard
                id={post._id } // Use post.id if available, otherwise fallback to index
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
                applicant={post.applications}
              /> // Use post.id and pass post
              ))
            ) : (
              <span>Post not found</span>
            )}

    </div>
  )
}

export default MyPosts