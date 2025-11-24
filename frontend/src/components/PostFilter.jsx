import React, { useState } from 'react';

const PostFilter = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...localFilters, [name]: value };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters); // Update parent component
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Filter Posts</h2>
      <form className="flex flex-col gap-4">
        {/* Rent Range */}
        <div>
          <label htmlFor="rentRange" className="block font-medium text-sm mb-1">
            Rent Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minRent"
              value={localFilters.minRent}
              placeholder="Min Rent"
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
            <input
              type="number"
              name="maxRent"
              value={localFilters.maxRent}
              placeholder="Max Rent"
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block font-medium text-sm mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={localFilters.gender}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* BHK */}
        <div>
          <label htmlFor="bhk" className="block font-medium text-sm mb-1">
            BHK
          </label>
          <select
            name="bhk"
            value={localFilters.bhk}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>
        </div>

        {/* Vacancy */}
        <div>
          <label htmlFor="vacancy" className="block font-medium text-sm mb-1">
            Vacancy Available
          </label>
          <select
            name="vacancy"
            value={localFilters.vacancy}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Vacancy</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default PostFilter;
