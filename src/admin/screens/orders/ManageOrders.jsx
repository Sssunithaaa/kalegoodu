import React, { useState, useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
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
  const tableRef = useRef(null);
  const handleExport = () => {
    // Hide excluded columns before exporting
    const excludedColumns = document.querySelectorAll('.exclude-from-export');
    excludedColumns.forEach(col => {
      col.style.display = 'none';
    });
    console.log(excludedColumns)

    // Trigger the Excel export
    setTimeout(() => {
      // Restore the hidden columns after exporting
      excludedColumns.forEach(col => {
        col.style.display = '';
      });
    }, 1000);
  };
  const [selectedItems, setSelectedItems] = useState({});

const handleCheckboxChange = (orderId, itemId, quantity) => {
  console.log(quantity)
  setSelectedItems(prevState => {
    const orderSelectedItems = prevState[orderId] || {};
    
    // Update or remove items based on quantity
     if(quantity==0){
      return {
        ...prevState,
        [orderId] : {
          ...orderSelectedItems,
          [itemId] : {quantity:0}
        }
      }
     }
      return {
        ...prevState,
        [orderId]: {
          ...orderSelectedItems,
          [itemId]: { quantity },
        },
      };
    }
  );
  console.log(selectedItems[orderId]?.[itemId]?.quantity)
};

const handleInTransit = async (orderId) => {
  const itemsToSend = selectedItems[orderId];
  
  if (!itemsToSend || Object.keys(itemsToSend).length === 0) {
    toast.error("No items selected");
    return;
  }

  // Map the items to send
  const items = Object.entries(itemsToSend).map(([itemId, item]) => ({
    product_id: itemId, 
    quantity: item.quantity,
  }));
  console.log(items)
  try {
    await axios.put(`${url}/api/acknowledge_order/`, {
      order_id: orderId,
      items,
    });
    toast.success("Order items updated to In Transit");
  } catch (error) {
    console.log(error)
    toast.error("Failed to update order items. Try again!");
  }
};




  return (
    <div className='overflow-y-auto overflow-x-auto w-full'>
   
   <div className=' flex mx-auto'>
       <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <Button className='mx-10 w-[100%]' onClick={handleExport}> Export excel </Button>

                </DownloadTableExcel>
   </div>
    <DataTable
      pageTitle="Manage Orders"
      dataListName="Orders"
      searchInputPlaceHolder="Order name..."
      
      tableHeaderTitleList={["Sl No.", "Customer Name",  "Total amount", "Total Products", "Items"," "]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={paginatedData}
      ref = {tableRef}
      
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
          <th className=" px-3 py-2 text-md bg-white border-b border-gray-200"></th>
          <th className=" px-3 py-2 text-md bg-white border-b border-gray-200">Product Name</th>
          <th className=" px-3 py-2 text-md bg-white border-b border-gray-200">Quantity</th>
          <th className=" px-3 py-2 text-md bg-white border-b border-gray-200">Price</th>
        </tr>
        
      </thead>
      <tbody>
          {order.items.map((item) => (
  <tr key={item.order_item_id}>
    <td className="px-3 py-2 text-md bg-white border-b border-gray-200">
      <input
        type="checkbox"
        onChange={(e) => handleCheckboxChange(order.order_id, item.order_item_id, e.target.checked ? item.quantity : 0)}
      />
    </td>
    <td className="px-3 py-2 text-md bg-white border-b border-gray-200">{item.product_name}</td>
    <td className="px-3 py-2 text-md bg-white border-b border-gray-200">
 <td className="px-3 py-2 text-md bg-white border-b border-gray-200">
  <input
    type="number"
    value={selectedItems[order.order_id]?.[item.order_item_id]?.quantity === 0 ? 0 : selectedItems[order.order_id]?.[item.order_item_id]?.quantity  || item.quantity}
    className='w-full'
    onChange={(e) => handleCheckboxChange(order.order_id, item.order_item_id, Number(e.target.value))}
  />
</td>

</td>

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
    In Transit
  </Button>
</td>

          <td className="exclude-from-export px-5 py-5 text-md bg-white border-b border-gray-200 ">
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
