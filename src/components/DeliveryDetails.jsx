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
   <div className='w-full'>
     <div className="terms-container  md:w-[60%] mx-auto text-[#1D1D1D] px-20 py-5">
     
      

      <Title>DELIVERY DETAILS</Title>
       <div className='flex mx-auto px-10 md:w-[700px] text-center my-4 text-[#1D1D1D]'>
        {data?.[3]?.content}
       </div>
      </div>
   </div>
  );
};

export default DeliveryDetails;