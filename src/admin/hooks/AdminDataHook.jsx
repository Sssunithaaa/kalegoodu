import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

let isFirstRun = true;

const useAdminData = ({ dataQueryFn, dataQueryKey, mutateDeleteFn, deleteDataMessage }) => {
  const queryClient = useQueryClient();
//   const userState = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryFn: dataQueryFn,
    queryKey: [dataQueryKey, searchKeyword, currentPage],
  });

  const { mutate: mutateDelete, isLoading: isLoadingDeleteData } = useMutation({
    mutationFn: mutateDeleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries([dataQueryKey]);
      toast.success(deleteDataMessage);
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage, searchKeyword]);

  const handleSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleDelete = (id) => {
    if (window.confirm('Do you want to delete this record?')) {
      mutateDelete({ id });
    }
  };

  return {
    // userState,
    currentPage,
    searchKeyword,
    data,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    handleSearchKeywordChange,
    handleSearchSubmit,
    handleDelete,
    setCurrentPage,
  };
};

export default useAdminData;
