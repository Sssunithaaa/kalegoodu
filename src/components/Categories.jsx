import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/index/postCategories';
import styled from 'styled-components';
const ImageWrapper = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-cover: cover;
  margin: 0 auto;
  transition: transform 0.3s ease-in-out;

  ${(props) => props.hovered && `
    transform: scale(1.1);
  `}
`;
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
    const url = category.name.replaceAll(" ","-")
    navigate(`/products/${category?.category_id}/?category=${url}`);
  };


  const getDailyRandomImage = (images) => {
    const currentDate = new Date();
    const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 86400000); 
    const randomIndex = dayOfYear % images.length; 
    
    return images? images[randomIndex]?.image : null;
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
          <ImageWrapper
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
