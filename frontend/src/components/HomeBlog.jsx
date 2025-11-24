import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { ArrowRight } from 'lucide-react';

const HomeBlog = () => {
  // Use the first blog as featured, and next 3 as side posts
  const featuredBlog = blogs[0];
  const sideBlogs = blogs.slice(1, 4);

  return (
    <div className="w-full my-10 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6 px-2">
        <h1 className='text-3xl font-bold text-orange-600'>Latest from our Blog</h1>
        <Link to="/blog" className="text-gray-600 hover:text-orange-600 flex items-center gap-1 font-medium transition-colors">
          View All <ArrowRight size={18} />
        </Link>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Featured Blog - Left Side */}
        <Link to={`/blog/${featuredBlog.id}`} className="w-full md:w-1/2 group">
          <div className="w-full h-full flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-full h-64 md:h-80 overflow-hidden relative">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {featuredBlog.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow bg-white">
              <div className="text-sm text-gray-500 mb-2">{featuredBlog.date}</div>
              <h2 className="font-bold text-2xl mb-3 text-gray-800 group-hover:text-orange-600 transition-colors">
                {featuredBlog.title}
              </h2>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {featuredBlog.excerpt}
              </p>
              <span className="text-orange-600 font-semibold mt-auto flex items-center">
                Read Article <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>

        {/* Side Blogs - Right Side */}
        <div className='w-full md:w-1/2 flex flex-col gap-4'>
          {sideBlogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="group">
              <div className='flex w-full h-32 md:h-36 border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white'>
                <div className='w-2/5 h-full overflow-hidden relative'>
                  <img
                    src={blog.image}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                    alt={blog.title}
                  />
                </div>
                <div className='w-3/5 p-4 flex flex-col justify-center'>
                  <div className="text-xs text-orange-600 font-semibold mb-1">{blog.category}</div>
                  <h3 className='text-lg font-bold text-gray-800 leading-tight mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors'>
                    {blog.title}
                  </h3>
                  <div className="text-xs text-gray-500 mt-auto">{blog.date}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBlog;