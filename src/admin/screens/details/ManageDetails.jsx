import React from 'react';
import PolicyForm from './AddDetails';
import { useQuery } from '@tanstack/react-query';
import { getPageContents } from '../../../services/index/pageContent';
import BackButton from '../../BackButton';

const ManageDetails = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['page-contents'],
    queryFn: () => getPageContents(),
  });

  return (
    <div>
      <div className="flex w-full justify-start self-start">
        <BackButton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full p-4">
        <PolicyForm title={data?.[1]?.page_name} data={data?.[1]} id={2} />
        <PolicyForm title={data?.[2]?.page_name} data={data?.[2]} id={3} />
        <PolicyForm title={data?.[3]?.page_name} data={data?.[3]} id={8} />
      </div>
    </div>
  );
};

export default ManageDetails;
