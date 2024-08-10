import React,{useEffect, useState} from 'react'
import DataTable from '../../DataTable'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

import AddSaleTypeDialog from './AddSaleType'

import styled from 'styled-components'
import Pagination from '../../../components/Pagination'
const Button = styled.button`
  width: 200px;
  height: 45px;
  background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
  background-color: #4CAF50;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #45a049;
  }
`;
const ManageSaleType = () => {
   const [sales,setSales] = useState([])
      const baseUrl = import.meta.env.VITE_APP_URL
      const PAGE_SIZE = 5;

  const [currentPage, setCurrentPage] = useState(1);
 const {data=[],isLoading,isFetching,refetch} = useQuery({
  queryKey: ["saletypes"],
  queryFn: async () => {
    const response = await axios.get(`${baseUrl}/api/sale_types/`);
    
    return response.data?.sale_types
  }
 })
 const [selectedSaleType, setSelectedSaleType] = useState(null);

const handleEditClick = (saleType) => {
  setSelectedSaleType(saleType);
  handleOpenDialog();
};
 useEffect(()=> {
  setSales(data)
 },[data])
 const [searchKeyword, setSearchKeyword] = useState("");

const searchKeywordOnChangeHandler = (event) => {
  setSearchKeyword(event.target.value);
};
const searchKeywordOnSubmitHandler = (event) => {
  event.preventDefault();
  

  if (!searchKeyword || searchKeyword.trim() === "") {

    setSales(sales);
  } else {

    const filteredSales = sales?.filter((sale) =>
      sale.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setSales(filteredSales);
  }
};



 const [dialogOpen, setDialogOpen] = useState(false);

  // Handle opening the dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    refetch()
  };

  // Callback when form is submitted successfully
  const handleFormSubmit = () => {
    console.log("Sale type added successfully!");
  };
   
const totalPages = Math.ceil(sales?.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = sales?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const deleteDataHandler = async ({ saleTypeId }) => {
  try {
    await axios.delete(`${baseUrl}/api/sale_type/${saleTypeId}/delete/`);
    toast.success("Sale type deleted successfully");
    refetch()
    queryClient.invalidateQueries(["saletypes"]);
  } catch (error) {
    toast.error("Failed to delete sale type");
    console.error("Error deleting sale type:", error.message);
  }
};

  return (
    <div>
        <div>
      <Button onClick={handleOpenDialog}>
        Add New Sale Type
      </Button>
     <AddSaleTypeDialog
  open={dialogOpen}
  handleClose={handleCloseDialog}
  onSubmit={handleFormSubmit}
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
          tableHeaderTitleList={["Name", ""]}
          searchKeyword={searchKeyword}
          isLoading={isLoading}
          isFetching={isFetching}
          data={data}
          
        >
             {paginatedData?.map((sale)=>(
        <tr key={sale.sale_type_id}>
             <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {sale.name}
                  </p>
                </div>
              </td>
               <td className="px-5 py-5 gap-y-4 text-sm bg-white border-b border-gray-200 space-x-5">
               <button
  type="button"
  className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
  onClick={() => deleteDataHandler({ saleTypeId: sale.sale_type_id })}
>
  Delete
</button>

               <button
  onClick={() => handleEditClick(sale)}
  className="text-green-600 hover:text-green-900"
>
  Edit
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