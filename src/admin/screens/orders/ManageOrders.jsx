import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../DataTable';

import axios from 'axios';
import Pagination from '../../../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '../../../services/index/orders';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../components/Button';

const ManageProducts = () => {

 


 
const PAGE_SIZE = 5;

  const [currentPage, setCurrentPage] = useState(1);
    const {data=[],isLoading,refetch,isFetching} = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders
  })
 
  
 
 
  const url = import.meta.env.VITE_APP_URL
  
   
    const isLoadingDeleteData = false;
  const totalPages = Math.ceil(data?.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = data?.slice(startIndex, endIndex);
 console.log(paginatedData)
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const deleteDataHandler=async (id)=> {
    try {
      await axios.delete(`${url}/api/orders/${id}/delete/`)
      toast.success("Order deleted successfully")
      refetch()
    } catch (error) {
      toast.error("Failed to delete order!! Try again!!")
    }
  }
  
  return (
    <div className='overflow-y-auto overflow-x-auto w-full'>
    <DataTable
      pageTitle="Manage Orders"
      dataListName="Orders"
      searchInputPlaceHolder="Order name..."
      // searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      // searchKeywordOnChangeHandler={searchKeywordHandler}
      // searchKeyword={searchKeyword}
      tableHeaderTitleList={["Sl No.", "Customer Name",  "Total amount", "Total Products", "Items"," "]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={paginatedData}
      // setCurrentPage={setCurrentPage}
      // currentPage={currentPage}
    >
      <ToastContainer/>
      {paginatedData?.map((order) => (
        <tr key={order.order_id}>
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <div className="flex items-center">
              
             <p className="text-gray-900 whitespace-no-wrap">{order?.order_id}</p>
            </div>
          </td>
         <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{order?.customer_name}</p>
          </td>
          {/* <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{order.short_description}</p>
          </td> */}
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{order?.total_amount}</p>
          </td>
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
             {order?.count}
            </p>
          </td>
         <td className="px-3 py-2 text-md bg-white border-b border-gray-200">
  {order?.items?.length > 0 ? (
    <table className="bg-gray-300 w-full">
      <thead>
        <tr>
          <th className=" px-3 py-2 text-md bg-white border-b border-gray-200">Product Name</th>
          <th className=" px-3 py-2 text-md bg-white border-b border-gray-200">Quantity</th>
          <th className=" px-3 py-2 text-md bg-white border-b border-gray-200">Price</th>
        </tr>
      </thead>
      <tbody>
        {order.items.map((item) => (
          <tr key={item.order_item_id}>
            <td className="px-3 py-2 text-md bg-white border-b border-gray-200">{item.product_name}</td>
            <td className="px-3 py-2 text-md bg-white border-b border-gray-200">{item.quantity}</td>
            <td className="px-3 py-2 text-md bg-white border-b border-gray-200">{item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-900 whitespace-no-wrap">No Items</p>
  )}
</td>

           <td className="px-5 py-5 text-md bg-white border-b border-gray-200 ">
            <Button className='px-5'>In transit</Button>
           </td>
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200 ">
            <div className='flex flex-row gap-x-5'>
              <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler(
                   order.order_id, // Make sure the slug field is correctly used here
                 
                );
              }}
            >
              Delete
            </button>
            <Link
              to={`/admin/orders/manage/edit/${order.order_id}`} // Make sure the slug field is correctly used here
              className="text-green-600 hover:text-green-900"
            >
              Edit
            </Link>
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
    {!isLoading && <Pagination  onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPageCount={totalPages}/>}
    </div>
  );
};

export default ManageProducts;
