import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const CollectionCard = styled.div`
 
  overflow: hidden;
  padding-top: 4px;
  text-align: center;
  
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const CarouselImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
   @media (max-width: 768px) {
    width: 250px;
    height:250px;
  }
  
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 1;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 8px;
`;

const RightArrow = styled(ArrowButton)`
  right: 8px;
`;

const Collections = () => {
  const [categories, setCategories] = useState([]);
  const baseUrl = import.meta.env.VITE_APP_URL;
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/categories/`);
      const data = await response.json();
      return data.categories;
    },
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handlePrevImage = (categoryIndex) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      const category = newCategories[categoryIndex];
      const images = category.images;
      images.unshift(images.pop()); // Move last image to first position
      return newCategories;
    });
  };

  const handleNextImage = (categoryIndex) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      const category = newCategories[categoryIndex];
      const images = category.images;
      images.push(images.shift()); // Move first image to last position
      return newCategories;
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className='flex flex-wrap justify-center items-center px-[10%] mx-auto gap-x-10'>
      {categories && categories?.map((category, index) => (
        <CollectionCard key={category.category_id}>
          
          <ImageContainer>
            <LeftArrow onClick={() => handlePrevImage(index)}>
              <AiOutlineLeft />
            </LeftArrow>
            {category?.images.map((image, imgIndex) => (
              <CarouselImage
                key={image.category_image_id}
                src={`${baseUrl}${image.image}`}
                alt={image.alt_text || category.name}
                style={{ display: imgIndex === 0 ? 'block' : 'none' }}
              />
            ))}
            <RightArrow onClick={() => handleNextImage(index)}>
              <AiOutlineRight />
            </RightArrow>
          </ImageContainer>
          <h2 className='my-3 text-lg font-semibold text-gray-900'>{category.name}</h2>
          
        </CollectionCard>
      ))}
    </div>
  );
};

export default Collections;
