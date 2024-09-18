import React, { useState } from 'react';
import DataTable from '../../DataTable';
import Pagination from '../../../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BackButton from '../../BackButton';
const ManageComments = () => {
  const baseUrl = import.meta.env.VITE_APP_URL;
  const PAGE_SIZE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data = [], isLoading, isFetching,refetch } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/comments/`);
      return response.data?.comments || [];
    },
  });

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleDelete=async (id)=> {
    try {
      await axios.delete(`${baseUrl}/api/comment/${id}/delete/`);
      toast.success("Testimonial deleted successfully!!")
      refetch()
    } catch (error) {
      toast.error("Couldn't delete testimonial")
    }
  }
  const handleToggleVisibility = async (id, currentVisibility) => {
  try {
    console.log({
      display: !currentVisibility
    })
    const response = await axios.put(`${baseUrl}/api/update_comment/${id}/`, {
      display: !currentVisibility
    });
    console.log(response)
    toast.success("Visibility updated successfully!");
    refetch(); 
  } catch (error) {
    console.log(error)
    toast.error("Couldn't update visibility");
  }
};


  return (
    <div>
       <div className="flex ml-4 w-full justify-start self-start">
    <BackButton />
  </div>
      <DataTable
        pageTitle=""
        dataListName="Testimonials"
        searchInputPlaceHolder="Testimonial User Name..."
        tableHeaderTitleList={["Product", "User Name", "Text", "Rating","Visibility" ,""]}
        isLoading={isLoading}
        isFetching={isFetching}
        data={paginatedData}
        searchKeyword={searchKeyword}
        searchKeywordOnChangeHandler={(e) => setSearchKeyword(e.target.value)}
        searchKeywordOnSubmitHandler={(e) =>
          searchKeywordOnSubmitHandler(e, data, searchKeyword)
        }
      >
        <ToastContainer/>
        {paginatedData.map((comment) => (
          <tr key={comment.comment_id}>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <div className="flex items-center">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment.product_name}
                </p>
              </div>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <div className="flex items-center">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment.user_name}
                </p>
              </div>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <div className="flex items-center">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment.text}
                </p>
              </div>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <div className="flex items-center">
                <p className="text-gray-900 flex flex-row gap-x-3 my-auto whitespace-no-wrap">
                  {comment.rating} <FaStar className="text-yellow-500" />
                </p>
              </div>
            </td>
           <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
  <div className="flex items-center">
    <button
      className={`py-1 px-4 rounded ${comment.display ? "bg-green-500" : "bg-red-500"} text-white`}
      onClick={() => handleToggleVisibility(comment.comment_id, comment.display)}
    >
      {comment.display ? "Visible" : "Hidden"}
    </button>
  </div>
</td>

            <td className="px-5 py-5 gap-y-4 text-md bg-white border-b border-gray-200 space-x-5">
              <button
                type="button"
                className="text-red-600 hover:text-red-900"
                onClick={()=>handleDelete(comment?.comment_id)}
              >
                Delete
              </button>
              <Link
                to={`/admin/comments/manage/edit/${comment.comment_id}`}
                className="text-green-600 hover:text-green-900"
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </DataTable>

      {!isLoading && (
        <Pagination
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPageCount={totalPages}
        />
      )}
    </div>
  );
}

export default ManageComments;
