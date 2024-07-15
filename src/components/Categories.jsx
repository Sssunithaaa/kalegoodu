import React, { useState } from 'react';
import {img,img1,img2,img3,img4} from '../assets/images'
const Categories = () => {
  // Sample data for categories
  const categories = [
    { id: 1, name: 'Electronics', image: img },
    { id: 2, name: 'Clothing', image: img1 },
    { id: 3, name: 'Books', image: img2 },
        { id: 4, name: 'Hats', image: img3 },
    { id: 5, name: 'Post', image: img4 },

  ];

  // State to track the hovered category
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Function to handle hover events
  const handleMouseEnter = (categoryId) => {
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="flex justify-center overflow-x-auto flex-wrap w-full">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`m-4 text-center `}
          onMouseEnter={() => handleMouseEnter(category.id)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={category.image}
            alt={category.name}
            className={`w-40 h-40 rounded-full object-cover mx-auto ${hoveredCategory === category.id ? 'transform scale-110 ease-in-out duration-300' : ''}`}
          />
          <div className="mt-2">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
