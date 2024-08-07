import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/index/postCategories';

const Categories = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories
  });

  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (categoryId) => {
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/?category=${category.name}`);
  };

  // Function to get a random image based on the current day
  const getDailyRandomImage = (images) => {
    const currentDate = new Date();
    const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 86400000); // Get the day of the year
    const randomIndex = dayOfYear % images.length; // Use modulo to cycle through images
    
    return images[randomIndex].image;
  };
  const url = import.meta.env.VITE_APP_URL
  return (
    <div className="flex justify-center overflow-x-auto flex-wrap w-full">
      {data?.categories?.map((category) => (
        <div
          key={category.category_id}
          className={`m-4 text-center `}
          onMouseEnter={() => handleMouseEnter(category.category_id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick(category)}
        >
          <img
            src={`${url}${getDailyRandomImage(category.images)}`} // Add base URL to image path
            alt={category.name}
            className={`w-40 h-40 rounded-full object-cover mx-auto ${hoveredCategory === category.category_id ? 'transform scale-110 ease-in-out duration-300' : ''}`}
          />
          <div className="mt-2">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
