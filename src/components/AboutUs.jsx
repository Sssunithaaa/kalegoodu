import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useQuery } from '@tanstack/react-query';
import { getPageContents } from '../services/index/pageContent';
import { motion } from 'framer-motion';
import {fadeIn} from '../utils/motion'
import {SectionWrapper} from '../hoc'
 const url = import.meta.env.VITE_APP_URL;
const FoundersImage = styled.img`
  width: 350px;
  height: auto;
  object-fit: cover;
  margin: 1rem;
`;
 
const AboutUs = ({ }) => {
   const {data,isLoading} = useQuery({
    queryKey: ["page-contents"],
    queryFn: ()=>getPageContents(),


  })

  return (
    <div id="about-us" className="about-us-container max-w-7xl mx-auto px-2 md:px-6">
      <div className="founders-section my-2 flex flex-col md:flex-row gap-x-4 justify-center items-center text-center">
        <motion.div variants={fadeIn("right","",0.3,1)} className="founders-content md:w-[50%] flex flex-col px-4 md:flex-row justify-end items-center">
          {isLoading ? (
            <Skeleton width={350} height={350} />
          ) : (
            <FoundersImage src={`${data?.[0]?.images[0]?.image}`} alt="Founder 1" loading="lazy" />
          )}
        </motion.div>
        <div className="founder-description flex flex-col justify-start items-start text-md px-4 md:w-[50%] md:text-lg text-gray-700 text-left">
          <motion.p variants={fadeIn("left","",0.3,1)} className="md:text-lg text-md font-bold mb-2">
            {isLoading ? <Skeleton width={200} /> : 'HELLO, From the Founders'}
          </motion.p>
          <motion.p 
        variants={fadeIn("left", "", 0.3, 1)} className="text-md text-justify md:text-lg mx-w-lg">
            {isLoading ? (
              <Skeleton count={6} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: data?.[0]?.content }} />
            )}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default SectionWrapper(AboutUs,"");
