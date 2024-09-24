import React from 'react';
import Title from './Title';
import { useQuery } from '@tanstack/react-query';
import { getPageContents } from '../services/index/pageContent';
const DeliveryDetails = () => {
   const { data, isLoading } = useQuery({
    queryKey: ['page-contents'],
    queryFn: () => getPageContents(),
  });
  return (
   <div className='terms-container px-4'>
    
     
      

      <Title>DELIVERY DETAILS</Title>
       <div className='flex mx-auto md:w-[900px] text-justify my-2 text-[#1D1D1D]'>
      
      
       <div dangerouslySetInnerHTML={{ __html: data?.[3]?.content }} />
        </div>
      </div>
   
  );
};

export default DeliveryDetails;
