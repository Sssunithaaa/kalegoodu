import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import Testimonial from './Testimonial';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../Title';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { SectionWrapper } from '../../hoc';
const Testimonials = ({ comments }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
  };
  const baseUrl = import.meta.env.VITE_APP_URL;

  const { data ,isLoading,isLoadingError} = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      // all-comments
      const response = await axios.get(`${baseUrl}/api/comments/`);
      return response.data?.comments;
    },
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

  const averageRating = reviews?.length
    ? (reviews?.reduce((sum, comment) => sum + comment.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings yet';

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };
const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap:wrap;
  justify-content: space-between;
`;

const SkeletonCard = styled.div`
  flex: 1;
  padding: 10px;
`;
  return (
    <div className={`${productMode ? 'w-full max-w-full' : 'bg-gradient-to-r w-full max-w-full from-[#ECF487] via-green-50 to-[#C0E6CD] bg-opacity-5 py-12'}`}>
      <div className=" mx-auto px-4">
        <Title>
          {productMode ? reviews.length === 0 ? '' : 'Customers would like to say this about our product' : 'Testimonials'}
        </Title>
        {/* {productMode && reviews.length > 0 && (
          <div className="text-center text-gray-600">
            <div className="text-xl">{averageRating} / 5.0</div>
            <div className="text-2xl">{renderStars(Math.round(averageRating))}</div>
            <div className="text-sm mt-1">{reviews.length} Reviews</div>
          </div>
        )} */}
        {isLoading || isLoadingError ? <SkeletonContainer>
          {[...Array(2)].map((_, index) => (
            <SkeletonCard key={index}>
              <Skeleton height={200} />
              
            </SkeletonCard>
          ))}
        </SkeletonContainer> : <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          { reviews?.map((testimonial, index) => (
           testimonial.display &&  <Testimonial key={index} {...testimonial} productMode={productMode} />
          ))}
        </Masonry>}
      </div>
    </div>
  );
};

export default Testimonials;
