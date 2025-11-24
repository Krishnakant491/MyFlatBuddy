import React from 'react'

const Aboutus = () => {
  return (
<div className="w-full flex flex-col items-center ">
    {/* Hero Section */}
    <div className="w-full flex flex-col">
        <div className="w-full min-h-[35vh] bg-gradient-to-r from-[#5F0EFC] to-[#B601FE] p-10 flex items-center justify-center gap-0.5 shadow-inner">
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                M
            </h1>
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                y
            </h1>
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                F
            </h1>
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                l
            </h1>
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                a
            </h1>
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                t
            </h1>
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                B
            </h1>
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                u
            </h1>
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                d
            </h1>
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                d
            </h1>
            <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                y
            </h1>
        </div>
    </div>

    {/* About Us Section */}
    <div className="w-full flex flex-col items-center ">
        <div className="max-w-5xl bg-white  rounded-lg p-8">
            <h1 className="text-4xl font-bold text-[#5F0EFC] text-center mb-6">About MyFlatBuddy</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to <span className="font-semibold text-[#5F0EFC]">MyFlatBuddy</span>, your ultimate solution for finding the perfect flatmate in a new city. 
                Moving to a new place can be daunting, especially when it comes to finding affordable accommodation and trustworthy roommates. 
                That’s where we come in!
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
                With <span className="font-semibold text-[#5F0EFC]">MyFlatBuddy</span>, you can:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 mt-4">
                <li>Connect with like-minded individuals who are also searching for roommates.</li>
                <li>Avoid the hassle of brokers and additional fees.</li>
                <li>Post or browse advertisements for room-sharing opportunities.</li>
                <li>Engage with an active and growing community of flat seekers.</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
                Our platform prioritizes a fast, free, and seamless experience for users. Whether you're a student, a professional, or just someone looking to share living costs, <span className="font-semibold text-[#5F0EFC]">MyFlatBuddy</span> is here to make your room-hunting journey easier.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
                Start your journey today. Create a post, find a roommate, and settle into your new city with ease. Together, we make finding your next flatmate simple and stress-free.
            </p>
        </div>
        <div className="mt-8">

        </div>
    </div>
</div>


  )
}

export default Aboutus