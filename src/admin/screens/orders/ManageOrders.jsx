import React, { useState, useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { toast, ToastContainer } from 'react-toastify';
import DataTable from '../../DataTable';
import axios from 'axios';
import { Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Button from '../../../components/Button';
const ManageProducts = () => {
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]); // State for checked items
    const baseUrl = import.meta.env.VITE_APP_URL;
  const fetchOrders = async (page = 1) => {
  const response = await axios.get(`https://kalegoodupractice.pythonanywhere.com/api/list-orders/?page=${page}`);
  return response.data;
};
  const {
  data: ordersData = { results: [], next: null, previous: null },
  isLoading,
  isFetching,
  refetch,
} = useQuery({
  queryKey :['orders', currentPage], 
  queryFn : () => fetchOrders(currentPage),
  keepPreviousData: true, // Useful for smooth transitions between pages
  
});

const orders = ordersData.results;



 
const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const tableRef = useRef(null);

  const [exportAll, setExportAll] = useState(true);
const handleExport = () => {
  let url = `${baseUrl}/api/export-customers-orders/`;
  let fileName = "customers_orders.xlsx";  // Default file name

  if (!exportAll && startDate && endDate) {
    url += `?start_date=${startDate}&end_date=${endDate}`;
    // Format the file name to include the start and end dates
    const formattedStartDate = new Date(startDate).toISOString().split('T')[0];  // "YYYY-MM-DD"
    const formattedEndDate = new Date(endDate).toISOString().split('T')[0];  // "YYYY-MM-DD"
    fileName = `customers_orders_${formattedStartDate}_to_${formattedEndDate}.xlsx`;
  }

  axios
    .get(url, { responseType: "blob" })
    .then((response) => {
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", fileName);  // Use dynamic file name
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Orders exported successfully!");
    })
    .catch((error) => {
      console.error("Export failed:", error);
      toast.error("Failed to export orders. Please try again.");
    });
};

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

const handleQuantityChange = (orderId, item, quantity) => {
  setSelectedItems((prevState) => {
    const orderSelectedItems = prevState[orderId] || {};

    return {
      ...prevState,
      [orderId]: {
        ...orderSelectedItems,
        [item.order_item_id]: {
          ...(orderSelectedItems[item.order_item_id] || {
            product_id: item.product,
          }),
          quantity, // Update quantity
        },
      },
    };
  });
};

const handleCheckboxChange = (orderId, item, isChecked) => {
console.log(isChecked)
  setSelectedItems((prevState) => {
    const orderSelectedItems = prevState[orderId] || {};

    const updatedOrderItems = {
      ...orderSelectedItems,
      [item?.order_item_id]: {
        ...orderSelectedItems[item.order_item_id],
        product_id: item.product,
        quantity: item.quantity,
        order_completed: isChecked, // Toggle the checkbox state
      },
    };

    // If unchecked, remove the item
    if (!isChecked) {
      const { [item?.order_item_id]: _, ...rest } = updatedOrderItems;
      return {
        ...prevState,
        [orderId]: rest,
      };
    }

    return {
      ...prevState,
      [orderId]: updatedOrderItems,
    };
  });
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

  try {
    await axios.put(`${url}/api/acknowledge_order/`, {
      order_id: orderId,
      items,
    });
    toast.success("Order items updated to In Transit");
    refetch()
  } catch (error) {
    console.log(error)
    toast.error("Failed to update order items. Try again!");
}
}
 
const [searchKeyword, setSearchKeyword] = useState("");
const searchKeywordOnChangeHandler = (event) => {
  setSearchKeyword(event.target.value);
};
const searchKeywordOnSubmitHandler = (event) => {
  event.preventDefault();
 

  if (!searchKeyword || searchKeyword.trim() === "") {

    // setOrders(orders);
  } else {

    const filteredcategories = orders?.filter((product) =>
      product.customer_name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
   
    // setOrders(filteredcategories);
    
  }
};

 const url = import.meta.env.VITE_APP_URL;
  // const totalPages = Math.ceil(data?.length / PAGE_SIZE);
  // const startIndex = (currentPage - 1) * PAGE_SIZE;
  // const endIndex = startIndex + PAGE_SIZE;
  // const paginatedData = orders?.slice().reverse().slice(startIndex, endIndex);
  const totalPages = Math.ceil(ordersData.count); // Assuming 10 items per page

  const handlePageChange = (event,page) => {
    setCurrentPage(page);
  };

  
  return (
    <div className="w-full overflow-x-auto">
     <div className='flex flex-col justify-center mx-auto'>
      <h1 className='font-bold text-2xl mb-2 text-center'>Export Customers Orders</h1>
      <div className='flex mx-auto mb-2 gap-x-2'>
        <label>
          <input
            type="radio"
            name="exportOption"
            checked={exportAll}
            onChange={() => setExportAll(true)}
          />
          Export All
        </label>
        <label>
          <input
            type="radio"
            name="exportOption"
            checked={!exportAll}
            onChange={() => setExportAll(false)}
          />
          Export by Date Range
        </label>
      </div>

      {!exportAll && (
        <div className='flex mx-auto gap-x-2'>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
      )}

      <Button className='text-left' onClick={handleExport}>Export Orders</Button>
    </div>

      <DataTable
        dataListName="Orders"
        searchInputPlaceHolder="Search By Order ID/Customer Name..."
        tableHeaderTitleList={['Sl No.', 'Order ID', 'Customer Name', 'Total amount', 'Total Quantity', 'Items',"Created At", ' ', ' ']}
        isLoading={isLoading}
        isFetching={isFetching}
        searchKeywordOnChangeHandler={searchKeywordOnChangeHandler}
        searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
        searchKeyword={searchKeyword}
        data={orders}
        ref={tableRef}
      >
        <ToastContainer />
        {orders?.map((order, index) => (
          <tr key={order.order_id}>
            <td className="px-3 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
            </td>
            <td className="px-3 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 font-bold whitespace-no-wrap">{order?.order_id}</p>
            </td>
            <td className="px-3 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{order?.customer_name}</p>
            </td>
            <td className="px-3 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{order?.total_amount}</p>
            </td>
            <td className="px-3 py-5 text-md bg-white border-b border-gray-200">
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
  checked={
    selectedItems[order?.order_id]?.[item?.order_item_id]?.order_completed || false
  }
   disabled={item?.order_completed}
  type="checkbox"
  onChange={(e) =>
    handleCheckboxChange(order?.order_id, item, e.target.checked)
  }
/>


    </td>
                        <td className="px-3 py-2 text-md bg-white border-b border-gray-200">{item.product_name}</td>
                       <td className="px-3 py-2 text-md bg-white border-b border-gray-200">

<input
  type="number"
  value={
    selectedItems[order.order_id]?.[item.order_item_id]?.quantity === 0
      ? 0
      : selectedItems[order.order_id]?.[item.order_item_id]?.quantity || item.quantity
  }
  className="w-full"
  onChange={(e) =>
    handleQuantityChange(order.order_id, item, Number(e.target.value))
  }
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
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{formatDate(order.created_at)}</p>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200 ">
 {!order?.order_completed ?  <Button  className='px-5' onClick={() => handleInTransit(order.order_id)}>
   {order?.order_completed ? "Success" : "In Transit"}
  </Button> : <p className='text-lg font-bold text-purple-600'>Order completed</p>}
</td>


          <td onClick={()=>deleteDataHandler(item.order_item_id)} className="px-3 py-2 text-md bg-white border-b border-gray-200">Delete</td>


          </tr>
        ))}
      </DataTable>
      {!isLoading && (
        <div className="flex justify-center my-3 mx-auto">
              <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              className="mt-5 flex justify-center"
            />
                    </div>
      )}
    </div>
  );
};

export default ManageProducts;
