import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { img28 } from '../assets/images';
import {  getAllCategoriess } from '../services/index/postCategories';
import { SectionWrapper } from '../hoc';
import { motion, AnimatePresence } from 'framer-motion';


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
  const { data, isLoading,isFetching } = useQuery({
    queryKey: ["categories"," "," "],
    queryFn: getAllCategoriess,
    refetchOnMount: true, // Ensures data refetches on component mount
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache for 30 minutes
    
    refetchOnWindowFocus: false, // No automatic refetch on focus
  });
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const url = useMemo(() => import.meta.env.VITE_APP_URL, []);
//  const filteredCategories = useMemo(() => {
//   if (!data || !data.categories) return [];
//   return data.categories.filter(category => category.visible);
// }, [data]);

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
  console.log(isLoading,isFetching)
  return (
    <div className="grid relative md:w-[90%] lg:w-[70%] w-[100%] justify-center my-2 overflow-x-auto grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 md:gap-x-1 mx-auto">
      <AnimatePresence>
        {isLoading || isFetching || !data?.length  ? (
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="md:mx-4 mx-2 my-[6px] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ShinyPlaceholder />
            </motion.div>
          ))
        ) : (
          data?.map((category, index) => (
            <motion.div
              key={category.category_id}
              className="md:mx-3 mx-2 my-[6px] text-center"
              onMouseEnter={() => handleMouseEnter(category.category_id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCategoryClick(category)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3 * index, duration: 0.6 }}
            >
              <LazyLoadImage
                src={import.meta.env.VITE_CLOUD_URL+ `${category?.images[0]?.image}`}
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
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Categories, "");
