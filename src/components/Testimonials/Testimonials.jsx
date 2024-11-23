import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import Testimonial from './Testimonial';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../Title';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';

const Testimonials = ({ comments }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
  };
  const baseUrl = import.meta.env.VITE_APP_URL;

  const { data, isLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/comments/`);
      return response.data?.comments;
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache for 30 minutes
    retry: 2, // Retry twice on failure
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 3000), // Exponential backoff
    refetchOnWindowFocus: false, // No automatic refetch on focus
  });

  const [reviews, setReviews] = useState([]);
  const [productMode, setProductMode] = useState(false);

  useEffect(() => {
    if (comments) {
      setReviews(comments);
      setProductMode(true);
    } else {
      setReviews(data);
    }
  }, [comments, data]);

  const SkeletonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  `;

  const SkeletonCard = styled.div`
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    margin-top: 20px;
  `;

  return (
    <div className={`${productMode ? 'w-full max-w-full' : 'bg-gradient-to-r w-full max-w-full from-[#ECF487] via-green-50 to-[#C0E6CD] bg-opacity-5 py-12'}`}>
      <div className="mx-auto px-4">
        <Title>
          {productMode && reviews.length === 0 ? '' : productMode ? 'Customers would like to say this about our product' : 'Testimonials'}
        </Title>
        
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {isLoading ? (
            
              Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index}>
                <Skeleton variant="rectangular" height="100%" />
              </SkeletonCard>
            ))
            
          ) : (
            reviews?.map((testimonial, index) => (
              testimonial.display && <Testimonial key={index} {...testimonial} productMode={productMode} />
            ))
          )}
        </Masonry>
      </div>
    </div>
  );
};

export default Testimonials;
