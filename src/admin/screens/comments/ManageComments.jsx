import React from 'react'
import DataTable from '../../DataTable'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const ManageComments = () => {
  const baseUrl = import.meta.env.VITE_APP_URL
 const {data,isLoading,isFetching} = useQuery({
  queryKey: ["comments"],
  queryFn: async () => {
    const response = await axios.get(`${baseUrl}/api/comments/`);
    
    return response.data?.comments
  }
 })
   const { mutate: deleteCategoryMutation, isLoading: isLoadingDeleteData } =
    useMutation({
      mutationFn: async ()=> {
        const response = await axios.get("")
      }, 
      onSuccess: () => {
        toast.success("Category deleted successfully");
        queryClient.invalidateQueries(["comments"]);
      },
      onError: (error) => {
        toast.error("Failed to delete comment");
        console.error("Error deleting comment:", error.message);
      },
});

  return (
    <div>
         <DataTable
          pageTitle=""
          dataListName="Testimonials"
          searchInputPlaceHolder="Testimonial text..."
         
          tableHeaderTitleList={["Product","User Name", "Text", "Rating", ""]}
          isLoading={isLoading}
          isFetching={isFetching}
          data={data}
          
        >
      {data?.map((comment)=>(
        <tr>
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
                    {comment.rating} <FaStar key={comment?.comment_id} className="text-yellow-500" />
                  </p>
                </div>
              </td>
              <td className="px-5 py-5 gap-y-4 text-sm bg-white border-b border-gray-200 space-x-5">
                <button
                  disabled={isLoadingDeleteData}
                  type="button"
                  className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => {
                    deleteDataHandler({
                      slug: comment.comment_id,
                      // token: userState.userInfo.token,
                    });
                  }}
                >
                  Delete
                </button>
                <Link
                  to={`/admin/categories/manage/edit/${comment.comment_id}`}
                  className="text-green-600 hover:text-green-900"
                >
                  Edit
                </Link>
              </td>  
        </tr>
      ))}

        </DataTable>

    </div>
  )
}

export default ManageComments