import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import { img, img1, img2, img3, img4 } from '../assets/images';

const Sidebar = () => {
  // Sample data for categories
  const categories = [
    { id: 1, name: 'Electronics', image: img },
    { id: 2, name: 'Clothing', image: img1 },
    { id: 3, name: 'Books', image: img2 },
    { id: 4, name: 'Hats', image: img3 },
    { id: 5, name: 'Post', image: img4 },
  ];

  // Sample data for filter options
  const types = ['Electronics', 'Clothing', 'Books', 'Hats', 'Post'];
  const colors = ['#FF0000', '#008000', '#0000FF', '#000000', '#808080', '#FFA500', '#800080'];

  // State to track selected filters
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Function to handle type filter change
  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // Function to handle color filter change
  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  // Function to handle price range change
  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
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
  <h3 className="text-lg font-semibold mb-2">Colors:</h3>
  <div className="flex space-x-2">
    {colors.map((color) => (
      <button
        key={color}
        className={`w-6 h-6 rounded-full ${selectedColors.includes(color) ? "ring-2 ring-offset-2 ring-gray-600" : ""}`}
        style={{ backgroundColor: color }}
        onClick={() => handleColorChange(color)}
      />
    ))}
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
            thumbClassName="bg-blue-500 rounded-full w-6 h-6"
            trackClassName="bg-blue-300 rounded"
            min={0}
            max={100}
            value={priceRange}
            onChange={handlePriceChange}
            pearling
            minDistance={10}
          />
          <div className="flex justify-between mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default Sidebar;
