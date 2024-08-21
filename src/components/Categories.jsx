import React, { useState ,useMemo,useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/index/postCategories';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ClipLoader } from 'react-spinners';
import { img28 } from '../assets/images';

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
  const { data, isLoading } = useQuery({
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

  // const getDailyRandomImage = useMemo(() => (images) => {
  //   const currentDate = new Date();
  //   const dayOfYear = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 86400000); 
  //   const randomIndex = dayOfYear % images.length; 
  //   return images ? images[randomIndex]?.image : null;
  // }, []);
 
  return (
    <div className="grid md:w-[90%] lg:w-[80%] w-[100%] justify-center my-2 overflow-x-auto grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 md:gap-x-4 mx-auto">
      {isLoading ? (
        <div className="flex h-full justify-center items-center">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        data?.categories?.map((category) => (
          <div
            key={category.category_id}
            className={`md:mx-4 mx-2 my-[6px] text-center `}
            onMouseEnter={() => handleMouseEnter(category.category_id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCategoryClick(category)}
          >
            <LazyLoadImage
              src={`${url}${category?.images[0]?.image}`}
              alt={category.name}
              placeholderSrc={img28} // Add your grey placeholder image path here
              wrapperClassName={`md:w-36 w-32 md:h-36 h-32 rounded-full object-cover mx-auto`}
              placeholder={<ShinyPlaceholder />} // Shiny placeholder component
            
              className={`md:w-36 w-32 md:h-36 h-32 rounded-full object-cover mx-auto ${hoveredCategory === category.category_id ? 'transform scale-110 ease-in-out duration-300' : ''}`}
            />
            <div className="mt-2 text-[#1d1D1D] text-[15px] md:text-[16px] font-medium">
              {category.name}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Categories;
