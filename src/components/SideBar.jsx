import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import { img, img1, img2, img3, img4 } from '../assets/images';

const Sidebar = () => {
  const categories = [
    { id: 1, name: 'Electronics', image: img },
    { id: 2, name: 'Clothing', image: img1 },
    { id: 3, name: 'Books', image: img2 },
    { id: 4, name: 'Hats', image: img3 },
    { id: 5, name: 'Post', image: img4 },
  ];

  const types = ['Electronics', 'Clothing', 'Books', 'Hats', 'Post'];

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
  };

  const handlePriceInputChange = (e, index) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
  };

  return (
    <div className="flex flex-col p-4 w-64">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Filter</h3>
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search:
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              id="search"
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 105.293 14.293l4.388 4.387a1 1 0 001.415-1.415l-4.388-4.387A8 8 0 0010 2zm-6 8a6 6 0 1112 0 6 6 0 01-12 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Types:</h3>
          {types.map((type) => (
            <label key={type} className="block">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
              <span className="ml-2">{type}</span>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Price Range:</h3>
          <ReactSlider
            className="w-full h-4 bg-gray-200 rounded"
            thumbClassName="bg-indigo-500 rounded-full w-6 h-6"
            trackClassName="bg-blue-300 rounded"
            min={0}
            max={100}
            value={priceRange}
            onChange={handlePriceChange}
            pearling
            
            minDistance={10}
          />
          <div className="flex justify-between mt-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceInputChange(e, 0)}
              className="w-20 p-1 border border-gray-300 rounded-md"
              min={0}
              max={priceRange[1]}
            />
            <span className="mx-2">to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceInputChange(e, 1)}
              className="w-20 p-1 border border-gray-300 rounded-md"
              min={priceRange[0]}
              max={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
