import React, { useState } from 'react';
import DataTable from '../../DataTable';
import Pagination from '../../../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageComments = () => {
  const baseUrl = import.meta.env.VITE_APP_URL;
  const PAGE_SIZE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data = [], isLoading, isFetching } = useQuery({
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

  return (
    <div>
      <DataTable
        pageTitle=""
        dataListName="Testimonials"
        searchInputPlaceHolder="Testimonial User Name..."
        tableHeaderTitleList={["Product", "User Name", "Text", "Rating", ""]}
        isLoading={isLoading}
        isFetching={isFetching}
        data={paginatedData}
        searchKeyword={searchKeyword}
        searchKeywordOnChangeHandler={(e) => setSearchKeyword(e.target.value)}
        searchKeywordOnSubmitHandler={(e) =>
          searchKeywordOnSubmitHandler(e, data, searchKeyword)
        }
      >
        {paginatedData.map((comment) => (
          <tr key={comment.comment_id}>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <div className="flex items-center">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment.product_name}
                </p>
              </div>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <div className="flex items-center">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment.user_name}
                </p>
              </div>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <div className="flex items-center">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment.text}
                </p>
              </div>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <div className="flex items-center">
                <p className="text-gray-900 flex flex-row gap-x-3 my-auto whitespace-no-wrap">
                  {comment.rating} <FaStar className="text-yellow-500" />
                </p>
              </div>
            </td>
            <td className="px-5 py-5 gap-y-4 text-sm bg-white border-b border-gray-200 space-x-5">
              <button
                type="button"
                className="text-red-600 hover:text-red-900"
                onClick={() => {
                  // handle delete
                }}
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
