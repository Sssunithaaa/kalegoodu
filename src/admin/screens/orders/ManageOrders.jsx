import React, { useState, useRef,useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import DataTable from '../../DataTable';
import axios from 'axios';
import { Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Button from '../../../components/Button';
import { getAllOrderss } from '../../../services/index/orders';
import DeleteConfirmationDialog from '../../ConfirmationDialog';
import { deleteItem } from '../../hooks/utils';
const ManageProducts = () => {
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]); // State for checked items
  const baseUrl = import.meta.env.VITE_APP_URL;
   const [searchType, setSearchType] = useState('customer_name'); // Default search type
  const [searchValue, setSearchValue] = useState('');
  // Fetch orders with search parameters
  const fetchOrders = async (page = 1, customer_name = '', order_id = '') => {
    try {
      const response = await getAllOrderss(page, customer_name, order_id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

 
  const {
    data: ordersData = { results: [], next: null, previous: null },
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['orders', currentPage, searchValue, searchType],
    queryFn: () => fetchOrders(currentPage, searchType === 'customer_name' ? searchValue : '', searchType === 'order_id' ? searchValue : ''),
    
      keepPreviousData: true, // Useful for smooth transitions between pages
    
});

const orders = ordersData.orders;

 
const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const tableRef = useRef(null);

  const [exportAll, setExportAll] = useState(true);
const handleExport = () => {
  let url = `${baseUrl}/api/export-customers-orders/`;  // Default URL
  let fileName = "customers_orders.xlsx";  // Default file name

  if (!exportAll && startDate && endDate) {
    url = `${baseUrl}/api/export-customers-orders-by-date/`;  // URL for date-based export
    const formattedStartDate = new Date(startDate).toISOString().split('T')[0];  // "YYYY-MM-DD"
    const formattedEndDate = new Date(endDate).toISOString().split('T')[0];  // "YYYY-MM-DD"
    fileName = `customers_orders_${formattedStartDate}_to_${formattedEndDate}.xlsx`;  // Format file name with dates
    url += `?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
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


 const [editingNote, setEditingNote] = useState(null);
  const [noteValue, setNoteValue] = useState("");

  const handleEditClick = (orderId, currentNote) => {
    setEditingNote(orderId);
    setNoteValue(currentNote || "");
  };

   const handleSaveNote = async (orderId, note) => {
    console.log("Saving note:", orderId, note);
    try {
      await axios.put(`${url}/api/acknowledge_order/`, {
        order_id: orderId,
        note: note,
        items: []
      });
      setEditingNote(null); // Exit edit mode after saving
      toast.success("Order note updated successfully.");
      refetch()
    } catch (error) {
      console.log("Error updating order note:", error);
      toast.error("Failed to update order note.");
    }
  };

    
const handleInTransit = async (orderId,order) => {
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
      note: order.note,
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




 const url = import.meta.env.VITE_APP_URL;
 
  const totalPages = Math.ceil(ordersData.totalCount/ PAGE_SIZE); 

  const handlePageChange = (event,page) => {
    setCurrentPage(page);
  };
 

  const handleSearch =  () => {
   refetch();
  };


  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
  
    const handleDeleteClick = (itemId) => {
      setSelectedItemId(itemId);
      setDeleteDialogOpen(true);
    };
  
    const handleConfirmDelete = async () => {
      const deleteUrl = `${baseUrl}/api/orders/${selectedItemId}/delete/`;
      await deleteItem(deleteUrl, refetch);
      setDeleteDialogOpen(false);
    };
  
  return (
    <div className="w-full overflow-x-auto">
       <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
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

      <div className="flex flex-col justify-center items-center gap-x-4 p-4 bg-gray-100 rounded-lg shadow-lg">
  <div className="flex flex-row items-start space-x-2 my-2">
    <label
      htmlFor="searchType"
      className="text-lg my-auto font-semibold text-gray-700"
    >
      Search by:
    </label>
    <select
      id="searchType"
      value={searchType}
      onChange={(e) => setSearchType(e.target.value)}
      className="border-2 border-gray-300 rounded-md p-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="customer_name">Customer Name</option>
      <option value="order_id">Order ID</option>
    </select>
  </div>

  <div className="flex items-center space-x-2">
    <input
      type="text"
      placeholder={`Enter ${searchType.replace('_', ' ')}`}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
    />
    <button
      onClick={handleSearch}
      className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Search
    </button>
  </div>
</div>

      <DataTable
        dataListName="Orders"
        searchInputPlaceHolder="Search By Order ID/Customer Name..."
        tableHeaderTitleList={['Order ID', 'Customer Name', 'Total amount', 'Total Quantity', 'Items',"Notes","Created At", 'Status']}
        isLoading={isLoading}
        isFetching={isFetching}
        searchKeywordOnChangeHandler={searchKeywordOnChangeHandler}
        // searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
        searchKeyword={searchKeyword}
        // data={filteredOrders}
        ref={tableRef}
        search="not-visible"
      >
        <ToastContainer />
        {orders?.map((order, index) => (
          <tr key={order.order_id}>
            
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
                       <td className="px-3 py-2 text-md bg-white border-b mx-auto border-gray-200">

{/* <input
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
/> */}
{item.quantity}

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
            <td className="px-3 py-5 text-md bg-white border-b border-gray-200">
            {editingNote === order.order_id ? (
              <div className="flex flex-col">
                <input
                  type="text"
                  value={noteValue}
                  onChange={(e) => setNoteValue(e.target.value)}
                  className="w-full px-2 py-1 border rounded focus:outline-none"
                />
                <button
                  onClick={() => handleSaveNote(order.order_id, noteValue)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-between items-center">
                <p className="text-gray-900 whitespace-no-wrap">{order?.note}</p>
                <button
                  onClick={() => handleEditClick(order.order_id, order?.note)}
                  className="mt-2 px-4 py-2 bg-gray-400 text-black rounded-lg hover:bg-gray-500"
                >
                  Edit
                </button>
              </div>
            )}
          </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{formatDate(order.created_at)}</p>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200 ">
 {!order?.order_completed ?  <Button  className='px-5' onClick={() => handleInTransit(order.order_id,order)}>
   {order?.order_completed ? "Success" : "In Transit"}
  </Button> : <p className='text-lg font-bold text-purple-600'>Order completed</p>}
</td>


         <td onClick={()=>handleDeleteClick(order.order_id)} className="px-3 py-2 text-md hover:cursor-pointer bg-white border-b border-gray-200">Delete</td> 


          </tr>
        ))}
      </DataTable>
      {!isLoading && (
        
              <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              className="mt-5 flex justify-center"
            />
                   
      )}
    </div>
  );
};

export default ManageProducts;
