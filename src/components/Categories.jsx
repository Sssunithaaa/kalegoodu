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
    navigate(`/Categories/${category?.category_id}/${url}`);
  };


  const getDailyRandomImage = (images) => {
    const currentDate = new Date();
    const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 86400000); 
    const randomIndex = dayOfYear % images.length; 
    
    return images? images[randomIndex]?.image : null;
  };
  const url = import.meta.env.VITE_APP_URL
  return (
  <div className="grid md:w-[90%] lg:w-[80%] w-[100%] justify-center my-2 overflow-x-auto grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 md:gap-x-4 mx-auto">
  {data?.categories?.map((category) => (
    <div
      key={category.category_id}
      className={`md:mx-4 mx-2 my-[6px] text-center `}
      onMouseEnter={() => handleMouseEnter(category.category_id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleCategoryClick(category)}
    >
      <ImageWrapper
        src={`${url}${getDailyRandomImage(category.images)}`} // Add base URL to image path
        alt={category.name}
        className={`md:w-36 w-32 md:h-36 h-32 rounded-full object-cover mx-auto ${hoveredCategory === category.category_id ? 'transform scale-110 ease-in-out duration-300' : ''}`}
      />
      <div className="mt-2 text-[#1d1D1D] font-medium">{category.name}</div>
    </div>
  ))}
</div>

  );
};

export default Categories;
