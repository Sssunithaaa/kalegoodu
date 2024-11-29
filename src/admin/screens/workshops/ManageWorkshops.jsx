import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../DataTable';

import axios from 'axios';
import Pagination from '../../../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { getAllWorkshops } from '../../../services/index/workshops';
import BackButton from '../../BackButton';

const ManageWorkshops = () => {

 


 
const PAGE_SIZE = 5;

  const [currentPage, setCurrentPage] = useState(1);
    const {data=[],isLoading,refetch,isFetching} = useQuery({
    queryKey: ["workshops"],
    queryFn: getAllWorkshops
  })

  const [workshops,setWorkshops] = useState([]);
  useEffect(()=> {
    setWorkshops(data)
  },[data])
  
  
const [searchKeyword, setSearchKeyword] = useState("");

const searchKeywordOnChangeHandler = (event) => {
  setSearchKeyword(event.target.value);
};
const searchKeywordOnSubmitHandler = (event) => {
  event.preventDefault();
 

  if (!searchKeyword || searchKeyword.trim() === "") {

    setWorkshops(workshops);
  } else {

    const filteredcategories = workshops?.filter((workshop) =>
      workshop.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
   
    setWorkshops(filteredcategories);
    
  }
};
 
  const url = import.meta.env.VITE_APP_URL
  
   
    const isLoadingDeleteData = false;
  const totalPages = Math.ceil(data?.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = workshops?.slice(startIndex, endIndex);
  useEffect(()=>{
    if(searchKeyword.trim()==""){
      setWorkshops(data)
    }
  },[searchKeyword])
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const deleteDataHandler=async (id)=> {
    try {
      await axios.delete(`${url}/api/workshops/${id}/delete/`)
      toast.success("Workshop deleted successfully")
     setTimeout(()=>{
       refetch()
     },2000)
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete workshop!! Try again!!")
    }
  }
  
  return (
    <div className='overflow-y-auto overflow-x-auto w-full'>
      <div className="flex ml-4 w-full justify-start self-start">
    <BackButton />
  </div>
    <DataTable
      // pageTitle="Manage Workshops"
      dataListName="Workshops"
      searchInputPlaceHolder="Workshop name..."
       searchKeywordOnChangeHandler={searchKeywordOnChangeHandler}
       searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
       searchKeyword={searchKeyword}
      tableHeaderTitleList={[ "Name",  "Date", "Place", "Description"," "]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={paginatedData}
     
    >
      <ToastContainer/>
      {paginatedData?.map((workshop) => (
        <tr key={workshop.workshop_id}>
          {/* <td className="py-5 text-md bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex flex-wrap gap-x-2">
                {
                  workshop?.images.map((image)=> (
                   
                  <img
                    src={
                      workshop.images.length > 0
                        ? "https://res.cloudinary.com/dgkgxokru/"+`${image.image}` // Construct full image URL
                        : 'path/to/sampleworkshopImage' // Replace with your sample image path
                    }
                    alt={workshop.name}
                    className="mx-auto object-cover rounded-lg w-10 md:w-4 aspect-square"
                  />
              
                  ))
                }
              </div>
             
            </div>
          </td> */}
         <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{workshop.name}</p>
          </td>
          {/* <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{workshop.short_description}</p>
          </td> */}
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{workshop.date}</p>
          </td>
             <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{workshop.place}</p>
          </td>
             <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{workshop.description}</p>
          </td>
       
         
          
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200 ">
            <div className='flex flex-row gap-x-5'>
              <Link
              to={`/admin/workshops/manage/edit/${workshop.workshop_id}`} // Make sure the slug field is correctly used here
              className="text-green-600 hover:text-green-900"
            >
              Edit
            </Link>
              <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler(
                   workshop.workshop_id, // Make sure the slug field is correctly used here
                 
                );
              }}
            >
              Delete
            </button>
            
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

export default ManageWorkshops;
