import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Contact, Edit, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import MyPosts from './MyPosts'
import { useSelector } from 'react-redux'
import useGetAllPosts from '@/hooks/useGetAllPosts'
import UpdateProfileDialog from './UpdateProfileDialog'


const Profile = () => {
  useGetAllPosts()
  
  const {user}= useSelector(store=>store.auth)
  const {allPost}= useSelector((store)=>store.post)
  const [open,setOpen]= useState(false)
  // console.log(allPost)
  return (
    <div>
      <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 px-8 py-4'>
        <div className='w-full flex justify-end'>
          <Button className='ml-auto mb-4 ' variant="outline" onClick={()=>setOpen(true)}>
          <Edit size={20} />
          </Button>
        </div>
        <div className=' mx-auto flex justify-between px-10'>
        <Avatar>
          <AvatarImage className='w-24' src='https://i.pinimg.com/564x/c7/ab/cd/c7abcd3ce378191a3dddfa4cdb2be46f.jpg' alt='profile' />
        </Avatar>
        <div>
        <h1 className='text-xl font-semibold'>{user.firstName} {user.lastName}</h1>
        <p className='text-right font-medium'>{user.role}</p>
        </div>
        </div>

        <div className='my-3'>
          <div className='flex gap-5 items-center'>
          <Mail size={20} />
          <p>{user.email}</p>
          </div>
          <div className='flex gap-5 items-center'>
          <Contact size={20} />
          <p>{user?.phoneNumber}</p>
          </div>
        </div>

      </div>
      <div className='max-w-7xl mx-auto border my-5  border-gray-200 p-8'>
      <h1 className='font-semibold text-2xl'>My Posts</h1>
        <MyPosts/>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile