import React, { useState, useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { toast, ToastContainer } from 'react-toastify';
import DataTable from '../../DataTable';
import axios from 'axios';
import Pagination from '../../../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '../../../services/index/orders';
import Button from '../../../components/Button';

const ManageProducts = () => {
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });

  const url = import.meta.env.VITE_APP_URL;
  const totalPages = Math.ceil(data?.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
const paginatedData = data?.slice().reverse().slice(startIndex, endIndex);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const tableRef = useRef(null);
 const handleExport = () => {
  const excludedColumns = document.querySelectorAll('.exclude-from-export');

  // Remove excluded columns before exporting
  excludedColumns.forEach(col => col.remove());

  // Trigger the Excel export
  setTimeout(() => {
    // Refetch or rerender the columns after export
    refetch();
  }, 1000);
};


  return (
    <div className="w-full overflow-x-auto">
      <div className="flex mx-auto">
        <DownloadTableExcel filename="Orders" sheet="Orders" currentTableRef={tableRef.current}>
          <Button className="w-[100%] ml-4" onClick={handleExport}>
            Export Excel
          </Button>
        </DownloadTableExcel>
      </div>

      <DataTable
        // pageTitle="Manage Orders"
        dataListName="Orders"
        searchInputPlaceHolder="Order name..."
        tableHeaderTitleList={['Sl No.','Order ID', 'Customer Name', 'Total amount', 'Total Products', 'Items', ' ',' ']}
        isLoading={isLoading}
        isFetching={isFetching}
        data={paginatedData}
        ref={tableRef}
      >
        <ToastContainer />
        {paginatedData?.map((order, index) => (
          <tr key={order.order_id}>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{startIndex + index + 1}</p>
            </td>
             <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 font-bold whitespace-no-wrap">{order?.order_id}</p>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{order?.customer_name}</p>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{order?.total_amount}</p>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{order?.count}</p>
            </td>
            <td className="px-3 py-2 text-md bg-white border-b border-gray-200">
              {order?.items?.length > 0 ? (
                <table className="bg-gray-300 w-full">
                  <thead>
                    <tr>
                      {/* Exclude checkbox column from export */}
                      <th className="exclude-from-export px-3 py-2 text-md bg-white border-b border-gray-200"></th>
                      <th className="px-3 py-2 text-md bg-white border-b border-gray-200">Product Name</th>
                      <th className="px-3 py-2 text-md bg-white border-b border-gray-200">Quantity</th>
                      <th className="px-3 py-2 text-md bg-white border-b border-gray-200">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.order_item_id}>
                        {/* Exclude checkbox column from export */}
                        <td className="exclude-from-export px-3 py-2 text-md bg-white border-b border-gray-200">
                          <input
                            checked={item.order_completed}
                            type="checkbox"
                            disabled={item?.order_completed}
                          />
                        </td>
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
  <Button className='px-5' onClick={() => handleInTransit(order.order_id)}>
   {order?.order_completed ? "Success" : "In Transit"}
  </Button>
</td>


            <td className="exclude-from-export px-5 py-5 text-md bg-white border-b border-gray-200">
              {/* Action buttons */}
              <div className="flex flex-row gap-x-5">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-900"
                  onClick={() => {
                    // Delete action handler
                  }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
      {!isLoading && (
        <div className="flex mx-auto">
          <Pagination onPageChange={handlePageChange} currentPage={currentPage} totalPageCount={totalPages} />
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
