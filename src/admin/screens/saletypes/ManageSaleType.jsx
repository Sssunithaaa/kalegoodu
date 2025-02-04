import React,{useEffect, useState} from 'react'
import DataTable from '../../DataTable'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import AddSaleTypeDialog from './AddSaleType'
import Pagination from '../../../components/Pagination'


const ManageSaleType = () => {
   const [sales,setSales] = useState([])
  const baseUrl = import.meta.env.VITE_APP_URL
      const PAGE_SIZE = 5;
 const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState("created_at-desc");
const { data = [], isLoading, isFetching, refetch } = useQuery({
  queryKey: ["saletypes", searchKeyword, sortOption], // Ensure query refetches when searchKeyword changes
  queryFn: async () => {
    let field = sortOption.split("-")[0];
    let order = sortOption.split("-")[1];

    let queryParams = {};

    if (searchKeyword) {
      queryParams.search = searchKeyword;  // Ensure search parameter is included
    }

    if (sortOption === "visible-true" || sortOption === "visible-false") {
      queryParams.sort_by = "visible";
      queryParams.sort_order = sortOption === "visible-true";
    } else {
      queryParams.sort_by = field;
      queryParams.sort_order = order;
    }

    const response = await axios.get(`${baseUrl}/api/sale_types/`, { params: queryParams });

    return response.data?.sale_types;
  }
});

 const [selectedSaleType, setSelectedSaleType] = useState(null);

const handleEditClick = (saleType) => {
  setSelectedSaleType(saleType);
  handleOpenDialog();
};
useEffect(()=>{
  setSelectedSaleType(null)
},[])
 useEffect(()=> {
  setSales(data)
 },[data])

const searchKeywordOnChangeHandler = (event) => {
  setSearchKeyword(event.target.value);
};

const searchKeywordOnSubmitHandler = (event) => {
  event.preventDefault();
  setCurrentPage(1); // Reset to first page on search
};

 const [dialogOpen, setDialogOpen] = useState(false);
  
 const handleOpenDialog = () => {
  setDialogOpen(true);
};


  // Handle closing the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSaleType(null)
    refetch()
  };

 
   
const totalPages = Math.ceil(sales?.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = sales?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
const handleToggleVisibility = async (id, currentVisibility) => {
  try {
    await axios.put(`${baseUrl}/api/update_sale_type/${id}/`, {
      visible: !currentVisibility
    });

    // Only show success toast after the update succeeds
    toast.success("Visibility updated successfully!");
    refetch(); // Re-fetch data after the change
  } catch (error) {
    // Show the error toast only if there was an error
    toast.error("Couldn't update visibility");
    console.log(error);
  }
};

const deleteDataHandler = async ({ saleTypeId }) => {
  try {
    await axios.delete(`${baseUrl}/api/sale_type/${saleTypeId}/delete/`);
    toast.success("Sale type deleted successfully");
    refetch(); // Re-fetch data after deletion
  } catch (error) {
    toast.error("Failed to delete sale type");
    console.error("Error deleting sale type:", error.message);
  }
};

  const sortOptions = [
     { label: "Visible", value: "visible-true" },
    { label: "Hidden", value: "visible-false" },
    { label: "Date, new to old", value: "created_at-desc" },
    { label: "Date, old to new", value: "created_at-asc" },
    { label: "Alphabetically, A-Z", value: "name-asc" },
    { label: "Alphabetically, Z-A", value: "name-desc" },
   
  ];

  return (
    <div>
        <div>
     
     <AddSaleTypeDialog
  open={dialogOpen}
  handleClose={handleCloseDialog}
  editSaleType={selectedSaleType}
/>
    </div>
    <ToastContainer/>
       <DataTable
          pageTitle=""
          dataListName="Sale types"
          searchInputPlaceHolder="Sale type..."
          searchKeywordOnChangeHandler={searchKeywordOnChangeHandler}
          searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
          tableHeaderTitleList={["Name","", ""]}
          sortOptions={sortOptions}
          sortOption={sortOption}
          setSortOption={setSortOption}
          keyword={searchKeyword}
          setKeyword={setSearchKeyword}
          isLoading={isLoading}
          isFetching={isFetching}
          data={data}
          setCurrentPage={setCurrentPage}
          saleType={true} // Enables AddSaleTypeDialog
          refetch={refetch}
          handleOpenDialog={handleOpenDialog}
          handleCloseDialog={handleCloseDialog}
          
        >
             {paginatedData?.map((sale)=>(
        <tr key={sale.sale_type_id}>
             <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {sale.name}
                  </p>
                </div>
              </td>
               <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
  <div className="flex items-center">
    <button
      className={`py-1 px-4 rounded ${sale.visible ? "bg-green-500" : "bg-red-500"} text-white`}
      onClick={() => handleToggleVisibility(sale.sale_type_id, sale.visible)}
    >
      {sale.visible ? "Visible" : "Hidden"}
    </button>
  </div>
</td>
               <td className="px-5 py-5 gap-y-4 text-md bg-white border-b border-gray-200 space-x-5">
                  <button
  onClick={() => handleEditClick(sale)}
  className="text-green-600 hover:text-green-900"
>
  Edit
</button>

               <button
  type="button"
  className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
  onClick={() => deleteDataHandler({ saleTypeId: sale.sale_type_id })}
>
  Delete
</button>

             
              </td>  
              </tr>
             ))}
            </DataTable> 
            {!isLoading && (
              <Pagination onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPageCount={totalPages}/>
            )}
    </div>
  )
}

export default ManageSaleType