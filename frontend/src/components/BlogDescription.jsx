import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { Calendar, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Button } from './ui/button';

const BlogDescription = () => {
    const { id } = useParams();
    const blog = blogs.find((b) => b.id === parseInt(id));

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
                <Link to="/blog">
                    <Button className="bg-orange-600 hover:bg-orange-700">Back to Blogs</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Image */}
            <div className="w-full h-[400px] relative">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                        {blog.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white max-w-4xl leading-tight mb-6">
                        {blog.title}
                    </h1>
                    <div className="flex items-center text-white/90 space-x-6">
                        <div className="flex items-center">
                            <User size={18} className="mr-2" />
                            <span className="font-medium">{blog.author}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar size={18} className="mr-2" />
                            <span className="font-medium">{blog.date}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
                <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
                    {/* Navigation & Actions */}
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                        <Link
                            to="/blog"
                            className="flex items-center text-gray-600 hover:text-orange-600 transition-colors font-medium"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Back to Blogs
                        </Link>
                        <div className="flex space-x-3">
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100">
                                <Share2 size={18} className="text-gray-600" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100">
                                <Bookmark size={18} className="text-gray-600" />
                            </Button>
                        </div>
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Author Bio (Mock) */}
                    <div className="mt-12 p-6 bg-gray-50 rounded-xl flex items-center gap-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-2xl">
                            {blog.author.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">About {blog.author}</h3>
                            <p className="text-gray-600 text-sm">
                                Real estate enthusiast and lifestyle writer sharing tips on modern living and finding the perfect home.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDescription;
