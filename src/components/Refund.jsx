import React from 'react';
import Title from './Title';
import { useQuery } from '@tanstack/react-query';
import { getPageContents } from '../services/index/pageContent';
const Refund = () => {
   const { data, isLoading } = useQuery({
    queryKey: ['page-contents'],
    queryFn: () => getPageContents(),
  });
  return (
    <div>
        <div>
            <Title>RETURNS AND REFUNDS POLICY</Title>
            </div>
            <div className='flex mx-auto px-10 md:w-[700px] text-center my-4 text-[#1D1D1D]'>
{data?.[2]?.content}
            </div>
    </div>
  );
};

export default Refund;
