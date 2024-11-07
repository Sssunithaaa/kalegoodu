import React from 'react';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getPageContents } from '../services/index/pageContent';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const url = import.meta.env.VITE_APP_URL;

const FoundersImage = styled.img`
  width: 100%;
  height: 40vh;
  object-fit: cover;
  margin: 1rem;
`;

const AboutUs = () => {
  const { data,isLoading } = useQuery({
    queryKey: ["page-contents"],
    queryFn: getPageContents,
  });


  return (
    <div id="about-us" className="about-us-container max-w-7xl mx-auto px-2 md:px-6">
      <div className="founders-section my-2 flex flex-col md:flex-row gap-x-4 justify-center items-stretch text-center">
        
        {/* Image Section */}
        <motion.div
          variants={fadeIn("right", "", 0.3, 1)}
          className="founders-content md:w-[50%] max-h-[50vh] flex flex-col px-4 justify-end items-center"
          style={{ height: '100%' }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height="40vh" width="100%" style={{ margin: '1rem' }} />
          ) : (
            <FoundersImage
              src={"https://res.cloudinary.com/dgkgxokru/" + `${data?.[0]?.images[0]?.image}`}
              alt="Founder 1"
              loading="lazy"
            />
          )}
        </motion.div>
        
        {/* Text Content Section */}
        <div className="founder-description flex flex-col justify-center items-start text-md px-4 md:w-[50%] md:text-lg text-gray-700 text-left">
          {/* Title Skeleton */}
          
          
          {/* Description Skeleton */}
         {isLoading ? (
  <div className='w-[100%]'>
    {Array.from({ length: 6 }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={index % 2 === 0 ? "80%" : "90%"} // Alternate widths for a more natural look
        height={30} // Adjust height for each skeleton line
        style={{ marginBottom: "4px" }}
      />
    ))}
  </div>
) : (
  <motion.p
    variants={fadeIn("left", "", 0.3, 1)}
    className={`text-md text-justify md:text-lg ${!isLoading ? "max-w-lg" : "max-w-2xl"}`}
  >
    <p className="font-bold text-lg">{'HELLO, From the Founders'}</p>
    <div dangerouslySetInnerHTML={{ __html: data?.[0]?.content }} />
  </motion.p>
)}

        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(AboutUs, "");
