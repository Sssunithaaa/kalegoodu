import React, { useState } from 'react';
import { img, img1, img2, img3, img4 } from '../assets/images';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  
  const categories = [
    { id: 1, name: 'Home decor', image: img,link:'home-decor' },
    { id: 2, name: 'Office decor', image: img1,link:'office-decor' },
    { id: 3, name: 'Kitchen decor', image: img2,link:'kitchen-decor' },
   
  ];

  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (categoryId) => {
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/?category=${category.link}`);
  };

  return (
    <div className="flex justify-center overflow-x-auto flex-wrap w-full">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`m-4 text-center `}
          onMouseEnter={() => handleMouseEnter(category.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick(category)}
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
