import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blogs = () => {
    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Hero Section */}
            <div className="w-full bg-gradient-to-r from-orange-500 to-orange-600 py-20 px-4 text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Our Blog</h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                    Insights, tips, and guides for finding your perfect home and living your best life.
                </p>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl w-full px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {blog.category}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                                    <div className="flex items-center">
                                        <Calendar size={14} className="mr-1" />
                                        {blog.date}
                                    </div>
                                    <div className="flex items-center">
                                        <User size={14} className="mr-1" />
                                        {blog.author}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-orange-600 transition-colors">
                                    <Link to={`/blog/${blog.id}`}>
                                        {blog.title}
                                    </Link>
                                </h2>

                                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                                    {blog.excerpt}
                                </p>

                                <Link
                                    to={`/blog/${blog.id}`}
                                    className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors mt-auto group"
                                >
                                    Read Article
                                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
