import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Testimonial from './Testimonial';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../Title';
import { Skeleton } from '@mui/material';

const Testimonials = ({ comments }) => {
  const baseUrl = import.meta.env.VITE_APP_URL;

  const { data, isLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/comments/`);
      return response.data?.comments;
    },
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 30, 
    retry: 2, 
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 3000),
    refetchOnWindowFocus: false, 
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

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className={`${productMode ? 'w-full max-w-full' : 'bg-opacity-5 py-12'}`}>
      <div className="mx-auto px-4">
        <Title>
          {productMode && reviews?.length !== 0 ? 'Customers would like to say this about our product' : productMode ? '' : "Testimonials"}
        </Title>

        {isLoading ? (
          <div className="flex justify-center gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width={300} height={200} />
            ))}
          </div>
        ) : (
         <Carousel
  responsive={responsive}
  infinite={true}
  autoPlay={true}
  autoPlaySpeed={3000}
  keyBoardControl={true}
  showDots={true}
  arrows={false}
  removeArrowOnDeviceType={["laptop","tablet", "mobile"]}
  containerClass="carousel-container"
  itemClass="py-4" // Adjust spacing between slides
  dotListClass="custom-dot-list-style" 
  // Custom styling for dots
  
>
  {(reviews || []).map((testimonial, index) => (
    testimonial.display && <Testimonial key={index} {...testimonial} productMode={productMode} />
  ))}
</Carousel>

        )}
      </div>
    </div>
  );
};

export default Testimonials;
