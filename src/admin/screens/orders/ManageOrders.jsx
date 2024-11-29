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
  const [selectedItems, setSelectedItems] = useState([]); // State for checked items
  const [checkedItems, setCheckedItems] = useState([])
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

    excludedColumns.forEach((col) => col.remove());
    setTimeout(() => {
      refetch();
    }, 1000);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (orderId, item, quantity) => {
    console.log(item)
    console.log(orderId)
  setSelectedItems(prevState => {
    const orderSelectedItems = prevState[orderId] || {};

    return {
      ...prevState,
      [orderId]: {
        ...orderSelectedItems,
        [item?.order_item_id]: {
          product_id: item.product,
          quantity: quantity,
          order_completed: true // Mark as completed if quantity is 0
        }
      }
    };
  });
}
  console.log(selectedItems)
    const deleteDataHandler=async (id)=> {
    try {
      await axios.delete(`${url}/api/orders/${id}/delete/`)
      toast.success("Order deleted successfully")
      refetch()
    } catch (error) {
      toast.error("Failed to delete order!! Try again!!")
    }
  }
const handleInTransit = async (orderId) => {
  const itemsToSend = selectedItems[orderId];

 if (!itemsToSend || Object.keys(itemsToSend).length === 0) {
   toast.error("No items selected");
       return;

      }
      const items = Object.entries(itemsToSend).map(([itemId, item]) => ({
   product_id: item.product_id,
    quantity: item.quantity,
  }));
 console.log({
      order_id: orderId,
      items,
    })
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
}
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
        dataListName="Orders"
        searchInputPlaceHolder="Order name..."
        tableHeaderTitleList={['Sl No.', 'Order ID', 'Customer Name', 'Total amount', 'Total Products', 'Items', ' ', ' ']}
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
                      <th className="px-3 py-2 text-md bg-white border-b border-gray-200"></th>
                      <th className="px-3 py-2 text-md bg-white border-b border-gray-200">Product Name</th>
                      <th className="px-3 py-2 text-md bg-white border-b border-gray-200">Quantity</th>
                      <th className="px-3 py-2 text-md bg-white border-b border-gray-200">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
  <tr key={item.order_item_id}>
    <td className="px-3 py-2 text-md bg-white border-b border-gray-200">
      <input
        checked={selectedItems[order.order_id]?.[item.order_item_id]?.order_completed  || item.order_completed || false}
        type="checkbox"
         disabled={item?.order_completed}
        onChange={(e) => handleCheckboxChange(order?.order_id,item,item?.quantity ? item?.quantity : 0)}
      />
    </td>
                        <td className="px-3 py-2 text-md bg-white border-b border-gray-200">{item.product_name}</td>
                       <td className="px-3 py-2 text-md bg-white border-b border-gray-200">

  <input
   type="number"
    value={selectedItems[order.order_id]?.[item.order_item_id]?.quantity === 0 ? 0 : selectedItems[order.order_id]?.[item.order_item_id]?.quantity  || item.quantity}

    className='w-full'
   onChange={(e) => handleCheckboxChange(order.order_id, item, Number(e.target.value))}
  />
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
   {order?.order_completed ? "Success" : "In Transit"}
  </Button>
</td>


          <td onClick={()=>deleteDataHandler(item.order_item_id)} className="px-3 py-2 text-md bg-white border-b border-gray-200">Delete</td>


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
