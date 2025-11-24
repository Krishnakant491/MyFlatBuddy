import { setSearchedQuery } from '@/redux/postSlice'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Herosection = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
    const [input, setInput] = useState('')
   
    const handleChange = (e) => {
     setInput(e.target.value)
    }

    const submitHandler= (e)=>{
        e.preventDefault()
            dispatch(setSearchedQuery(input))
            // console.log(input)
            navigate("/listings")
          
    }

  return (
    <div className='md:h-[70vh] h-[40vh] w-full flex items-center justify-center homepage'>
            <div className='mt-10 mb-5 w-full p-2 md:p-0'>

                <form onSubmit={submitHandler} className="bg-[#ffffffd5] flex px-1 py-1 rounded-full border  overflow-hidden max-w-md mx-auto font-[sans-serif]">
                    <input
                         className="w-full bg-transparent pl-4 text-sm border-none focus:outline-none focus:ring-0 focus:border-transparent home-input"
                        type="text"
                        onChange={handleChange}
                        placeholder="Enter locality or pincode"
                    />
                    <button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700 transition-all text-white text-sm rounded-full px-2.5 py-2.5"
                    >
                        <Search/>
                    </button>
                </form>
            </div>
        </div>
  )
}

export default Herosection