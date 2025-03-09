import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import FullPageLoader from './FullPageLoader';
import { getAllCategoriess } from '../services/index/postCategories';
import { useNavigate } from 'react-router-dom';

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
    height: 250px;
  }
`;

const Collections = () => {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['visible-categories'],
    queryFn: getAllCategoriess
  });

  useEffect(() => {
    setCategories(data);
  }, [data]);

  if (isLoading) return <FullPageLoader />;
  if (isError) return <div>Error fetching data</div>;

  const handleCategoryClick = (category) => {
    const url = category?.name?.replaceAll(' ', '-');
    navigate(`/Categories/${category?.category_id}/${url}`);
  };

  return (
    <div className="flex flex-wrap justify-center items-center px-[10%] mx-auto gap-x-10">
      {
        categories?.map((category) => (
          <CollectionCard key={category.category_id}>
            <ImageContainer>
              {category?.images.length > 0 && (
                <CarouselImage
                  src={import.meta.env.VITE_CLOUD_URL + category.images[0].image}
                  alt={category.images[0].alt_text || category.name}
                />
              )}
            </ImageContainer>
            <h2
              onClick={() => handleCategoryClick(category)}
              className="my-3 hover:cursor-pointer text-lg font-semibold text-gray-900"
            >
              {category.name}
            </h2>
          </CollectionCard>
        ))}
    </div>
  );
};

export default Collections;
