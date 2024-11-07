import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { img28 } from '../assets/images';
import { getAllCategories } from '../services/index/postCategories';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { Skeleton } from '@mui/material';
const ImageWrapper = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-cover: cover;
  margin: 0 auto;
  transition: transform 0.3s ease-in-out;
`;

const ShinyPlaceholder = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin: 0 auto;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const Categories = () => {
  const navigate = useNavigate();
  const { data, isLoading,isLoadingError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories
  });
  const [hoveredCategory, setHoveredCategory] = useState(null);
 

  const url = useMemo(() => import.meta.env.VITE_APP_URL, []);

  const handleMouseEnter = useCallback((categoryId) => {
    setHoveredCategory(categoryId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  const handleCategoryClick = useCallback((category) => {
    const url = category.name.replaceAll(" ", "-");
    navigate(`/Categories/${category?.category_id}/${url}`);
  }, [navigate]);

  return (
    <div className="grid relative md:w-[90%] lg:w-[70%] w-[100%] justify-center my-2 overflow-x-auto grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 md:gap-x-1 mx-auto">
      {isLoading || isLoadingError ? (
        Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="md:mx-4 mx-2 my-[6px] text-center">
            <ShinyPlaceholder />
           
           
            
          </div>
        ))
      ) : (
        data?.categories?.map((category,index) => (
          <motion.div
          variants={fadeIn("","",0.3*index,1)}
            key={category.category_id}
            className={`md:mx-3 mx-2 my-[6px] text-center`}
            onMouseEnter={() => handleMouseEnter(category.category_id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCategoryClick(category)}
          >
            <LazyLoadImage
              src={"https://res.cloudinary.com/dgkgxokru/"+`${category?.images[0]?.image}`}
              alt={category.name}
              placeholderSrc={img28}
              wrapperClassName={`md:w-36 w-32 md:h-36 h-32 rounded-full object-cover mx-auto`}
              placeholder={<ShinyPlaceholder />}
              className={`md:w-36 w-32 md:h-36 h-32 rounded-full object-cover mx-auto ${hoveredCategory === category.category_id ? 'transform scale-110 ease-in-out duration-300' : ''}`}
            />
            <div className="mt-2 text-[#1d1D1D] text-[15px] md:text-[16px] font-medium">
              {category.name}
            </div>
          </motion.div>
        ))
      )}
      {/* <div className='absolute flex bottom-0 mx-auto hover:cursor-pointer' onClick={()=>scrollToSection(newArrivalsRef)}><FaAngleDoubleDown color='gray'/></div> */}

    </div>
  );
};

export default SectionWrapper(Categories,"");
