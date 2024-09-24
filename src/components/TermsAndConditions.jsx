import React from 'react'
import Title from './Title'
import { useQuery } from '@tanstack/react-query'
import { getPageContents } from '../services/index/pageContent';

const TermsAndConditions = () => {
   const { data, isLoading } = useQuery({
    queryKey: ['page-contents'],
    queryFn: () => getPageContents(),
  });
  return (
    <div className='px-4'>
        <div>
            <Title>TERMS AND CONDITIONS</Title>
            </div>
            <div className='flex mx-auto md:w-[700px] my-2 text-[#1D1D1D]'>
<div dangerouslySetInnerHTML={{ __html: data?.[1]?.content }} />
            </div>
    </div>
  )
}

export default TermsAndConditions