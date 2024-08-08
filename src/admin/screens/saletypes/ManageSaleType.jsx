import React from 'react'
import DataTable from '../../DataTable'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

import { Link } from 'react-router-dom'
const ManageSaleType = () => {
      const baseUrl = import.meta.env.VITE_APP_URL
 const {data,isLoading,isFetching} = useQuery({
  queryKey: ["saletypes"],
  queryFn: async () => {
    const response = await axios.get(`${baseUrl}/api/sale_types/`);
    
    return response.data?.sale_types
  }
 })
   const { mutate: deleteSaletypeMutation, isLoading: isLoadingDeleteData } =
    useMutation({
      mutationFn: async ()=> {
        const response = await axios.get("")
      }, 
      onSuccess: () => {
        toast.success("Sale type deleted successfully");
        queryClient.invalidateQueries(["saletypes"]);
      },
      onError: (error) => {
        toast.error("Failed to delete sale type");
        console.error("Error deleting sale type:", error.message);
      },
});
  return (
    <div>
       <DataTable
          pageTitle="Sale types"
          dataListName="Sale types"
          searchInputPlaceHolder="Sale type..."
         
          tableHeaderTitleList={["Name", ""]}
          isLoading={isLoading}
          isFetching={isFetching}
          data={data}
          
        >
             {data?.map((sale)=>(
        <tr>
             <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {sale.name}
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
                      slug: sale.sale_type_id,
                      // token: userState.userInfo.token,
                    });
                  }}
                >
                  Delete
                </button>
                <Link
                  to={`/admin/categories/manage/edit/${sale.sale_type_id}`}
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

export default ManageSaleType