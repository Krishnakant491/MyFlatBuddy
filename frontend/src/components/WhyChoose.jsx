import React from 'react'
import brokers from "../assets/avoid-brokers.png"
import list from "../assets/list.png"
import lightning from "../assets/lightning.png"
import budget from "../assets/budget.png"

const WhyChoose = () => {
    return (
        <div className='my-5'>
            <div className='flex flex-col items-center w-full'>
                <h1 className='text-2xl'>Why Choose <span className='font-bold text-orange-600'>MyFlatBuddy</span>?</h1>
                <div className='flex w-[80%] flex-wrap justify-between'>
                    <div className='my-5 flex flex-col gap-3 items-center'><img className="md:h-32 h-28 " src={brokers} /> <h1 className='font-semibold text-xl'>Avoid Brokerage</h1> </div>
                    <div className='my-5 flex flex-col gap-3 items-center'><img className="md:h-32 h-28" src={list} /> <h1 className='font-semibold text-xl'>Free Listing</h1> </div>
                    <div className='my-5 flex flex-col gap-3 items-center'><img className="md:h-32 h-28" src={lightning} /> <h1 className='font-semibold text-xl'>Fast Process</h1> </div>
                    <div className='my-5 flex flex-col gap-3 items-center'><img className="md:h-32 h-28" src={budget} /> <h1 className='font-semibold text-xl'>Matched Budget</h1> </div>
                </div>
            </div>
        </div>
    )
}

export default WhyChoose