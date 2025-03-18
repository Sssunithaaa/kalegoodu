import React from 'react'
import Title from '../Title'
import { useQuery } from '@tanstack/react-query'
import { getPageContents } from '../../services/index/pageContent';

const TermsAndConditions = () => {
   const { data, isLoading } = useQuery({
    queryKey: ['page-contents'],
    queryFn: () => getPageContents(),
  });
  return (
    <div className='terms-container px-4'>
        <div>
            <Title>TERMS AND CONDITIONS</Title>
            </div>
            <div className='flex mx-auto max-w-6xl my-2 text-[#1D1D1D]'>
<div style={{whiteSpace: "pre-wrap"}} dangerouslySetInnerHTML={{ __html: data?.[1]?.content }} />
            </div>
    </div>
  )
}

export default TermsAndConditions