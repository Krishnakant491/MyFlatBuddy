import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Here you would typically send the data to your backend
            console.log('Form submitted:', formData);

            // Show success message
            setIsSubmitted(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Hero Section */}
            <div className="w-full flex flex-col">
                <div className="w-full min-h-[35vh] bg-gradient-to-r from-orange-500 to-orange-600 p-10 flex items-center justify-center gap-0.5 shadow-inner">
                    <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                        C
                    </h1>
                    <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                        o
                    </h1>
                    <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                        n
                    </h1>
                    <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                        t
                    </h1>
                    <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                        a
                    </h1>
                    <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                        c
                    </h1>
                    <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                        t
                    </h1>
                    <h1 className="text-6xl mx-4 font-semibold text-white">

                    </h1>
                    <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                        U
                    </h1>
                    <h1 className="text-6xl cursor-pointer font-semibold text-white transition-transform transform hover:scale-125 ease-in-out duration-300">
                        s
                    </h1>
                </div>
            </div>

            {/* Contact Section */}
            <div className="w-full max-w-7xl px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-orange-600 mb-6">Get In Touch</h2>
                        <p className="text-gray-700 text-lg mb-8">
                            Have questions or need assistance? We're here to help! Reach out to us through any of the following channels.
                        </p>

                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start gap-4 group">
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                                    <p className="text-gray-600">support@myflatbuddy.com</p>
                                    <p className="text-gray-600">info@myflatbuddy.com</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4 group">
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                                    <p className="text-gray-600">+91 1234567890</p>
                                    <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4 group">
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <MapPin className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800">Office</h3>
                                    <p className="text-gray-600">123 Tech Park, Bangalore</p>
                                    <p className="text-gray-600">Karnataka, India - 560001</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media or Additional Info */}
                        <div className="mt-8 p-6 bg-orange-50 rounded-lg border border-orange-100">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">Quick Response</h3>
                            <p className="text-gray-600">
                                We typically respond to all inquiries within 24 hours during business days.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-orange-600 mb-6">Send Us a Message</h2>

                        {isSubmitted && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                                <CheckCircle className="text-green-600" size={24} />
                                <p className="text-green-700 font-medium">Thank you! Your message has been sent successfully.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all`}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all`}
                                    placeholder="What is this about?"
                                />
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all resize-none`}
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Send size={20} />
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
