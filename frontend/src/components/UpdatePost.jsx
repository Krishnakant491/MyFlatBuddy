import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { RadioGroup } from './ui/radio-group';
import { useSelector } from 'react-redux';
import useGetSinglePost from '@/hooks/useGetSinglePost';

const UpdatePost = () => {
    const navigate = useNavigate();
    const params = useParams();
    // console.log(params.id)
    useGetSinglePost(params.id);
    const user = useSelector((store) => store.auth)
    const post = useSelector((store) => store.post.singlePost);
    // console.log(user.user)
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        landmark: '',
        state: '',
        city: '',
        postcode: '',
        vacancy: '',
        bhk: '',
        rent: '',
        gender: '',
        possessionDate: '',
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (post) {
            setFormData({
                address: post[0]?.address || '',
                landmark: post[0]?.landmark || '',
                state: post[0]?.state || '',
                city: post[0]?.city || '',
                postcode: post[0]?.postCode || '',
                vacancy: post[0]?.vacancy || '',
                bhk: post[0]?.bhk || '',
                rent: post[0]?.rent || '',
                gender: post[0]?.gender || '',
                possessionDate: post[0]?.possessionBy || '',
            });
        }
    }, [post[0]]);
    // console.log(formData)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();

        // Append all text fields
        formDataToSubmit.append('address', formData.address);
        formDataToSubmit.append('landmark', formData.landmark);
        formDataToSubmit.append('state', formData.state);
        formDataToSubmit.append('city', formData.city);
        formDataToSubmit.append('postCode', formData.postcode);
        formDataToSubmit.append('vacancy', formData.vacancy);
        formDataToSubmit.append('bhk', formData.bhk);
        formDataToSubmit.append('rent', formData.rent);
        formDataToSubmit.append('gender', formData.gender);
        formDataToSubmit.append('possessionBy', formData.possessionDate);

        // Append file if updated
        if (file) {
            formDataToSubmit.append('images', file);
        }

        try {
            const token = localStorage.getItem('token');
            setLoading(true);
            await axios.post(
                `${import.meta.env.VITE_API_URL}/user/update/${params.id}`,
                formDataToSubmit,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "authorization": `Bearer ${token}`,
                        "id": user?.user?._id
                    },

                }
            );
            toast.success('Post updated successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating post');
            console.error('Error updating post:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex mx-auto justify-center items-center p-5 max-w-7xl">
            <div className="flex flex-col items-center p-5 border border-gray-200 w-full">
                <h1 className='text-4xl font-semibold text-orange-600'>Update Post</h1>

                <form onSubmit={submitHandler} className="w-full justify-around items-center flex flex-wrap gap-4">
                    {/* Address Field */}
                    <div className="w-full">
                        <Label>Address</Label>
                        <Input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* Landmark Field */}
                    <div className="w-full">
                        <Label>Landmark</Label>
                        <Input
                            type="text"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* State Field */}
                    <div className="w-full">
                        <Label>State</Label>
                        <Input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* City Field */}
                    <div className="w-full">
                        <Label>City</Label>
                        <Input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* Postcode Field */}
                    <div className="w-[45%]">
                        <Label>Pin-Code</Label>
                        <Input
                            type="number"
                            name="postcode"
                            value={formData.postcode}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* Vacancy Field */}
                    <div className="w-[45%]">
                        <Label>Vacancy</Label>
                        <Input
                            type="number"
                            name="vacancy"
                            value={formData.vacancy}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* BHK Field */}
                    <div className="w-[45%]">
                        <Label>BHK</Label>
                        <Input
                            type="number"
                            name="bhk"
                            value={formData.bhk}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* Rent Field */}
                    <div className="w-[45%]">
                        <Label>Rent</Label>
                        <Input
                            type="number"
                            name="rent"
                            value={formData.rent}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold">Gender</span>
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === 'Male'}
                                    className="cursor-pointer"
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, gender: e.target.value }))
                                    }
                                />
                                <Label htmlFor="r1">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === 'Female'}
                                    className="cursor-pointer"
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, gender: e.target.value }))
                                    }
                                />
                                <Label htmlFor="r2">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="gender"
                                    value="Unisex"
                                    checked={formData.gender === 'Unisex'}
                                    className="cursor-pointer"
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, gender: e.target.value }))
                                    }
                                />
                                <Label htmlFor="r3">Unisex</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Possession Date Field */}
                    <div className="w-full">
                        <Label>Possession Date</Label>
                        <Input
                            type="date"
                            name="possessionDate"
                            value={formData.possessionDate}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    {/* File Upload Section */}
                    <div className="w-full">
                        <Label>Images</Label>
                        <div className="flex items-center gap-2 mb-2">
                            <Input
                                id="file"
                                name="images"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-1/2 mx-auto bg-blue-600 hover:bg-blue-700">
                        {loading ? 'Updating...' : 'Update'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePost;
