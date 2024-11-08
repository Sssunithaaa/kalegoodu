import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../DataTable';

import axios from 'axios';
import Pagination from '../../../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../../../services/index/products';
import { toast, ToastContainer } from 'react-toastify';
import BackButton from '../../BackButton';

const ManageProducts = () => {

 


 
const PAGE_SIZE = 5;

  const [currentPage, setCurrentPage] = useState(1);
    const {data=[],isLoading,refetch,isFetching} = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts
  })
  const [products,setProducts] = useState([]);
  useEffect(()=> {
    setProducts(data)
  },[data])
const [searchKeyword, setSearchKeyword] = useState("");

const searchKeywordOnChangeHandler = (event) => {
  setSearchKeyword(event.target.value);
};
const searchKeywordOnSubmitHandler = (event) => {
  event.preventDefault();
 

  if (!searchKeyword || searchKeyword.trim() === "") {

    setProducts(products);
  } else {

    const filteredcategories = products?.filter((product) =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
   
    setProducts(filteredcategories);
    
  }
};
  
  useEffect(()=>{
    if(searchKeyword.trim()==""){
      setProducts(data)
    }
  },[searchKeyword])
 
  const url = import.meta.env.VITE_APP_URL
  
   
    const isLoadingDeleteData = false;
  const totalPages = Math.ceil(data?.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = products?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const deleteDataHandler=async (id)=> {
    try {
      await axios.delete(`${url}/api/product/${id}/delete/`)
      toast.success("Product deleted successfully")
      refetch()
    } catch (error) {
      toast.error("Failed to delete product!! Try again!!")
    }
  }
  
  return (
    <div className='overflow-y-auto overflow-x-auto w-full'>
      <div className="flex w-full justify-start ml-4 self-start">
    <BackButton />
  </div>
    <DataTable
      // pageTitle="Manage Products"
      dataListName="Products"
      searchInputPlaceHolder="Product name..."
      searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
      searchKeywordOnChangeHandler={searchKeywordOnChangeHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Images", "Name",  "Price", "Discount Price", "Categories", "Sale Type"," "]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={paginatedData}
      // setCurrentPage={setCurrentPage}
      // currentPage={currentPage}
    >
      <ToastContainer/>
      {paginatedData?.map((product) => (
        <tr key={product.product_id}>
          <td className="py-5 text-md bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex flex-wrap gap-x-2">
                {
                  product?.images.map((image)=> (
                   
                  <img
                    src={
                      product.images.length > 0
                        ? "https://res.cloudinary.com/dgkgxokru/"+`${image.image}` // Construct full image URL
                        : 'path/to/sampleProductImage' // Replace with your sample image path
                    }
                    alt={product.name}
                    className="mx-auto object-cover rounded-lg w-10 md:w-4 aspect-square"
                  />
              
                  ))
                }
              </div>
             
            </div>
          </td>
         <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
          </td>
          {/* <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{product.short_description}</p>
          </td> */}
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{product.price}</p>
          </td>
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {product.discounted_price !== '0' ? (
                <>
                  <span className="line-through text-gray-500">
                    {product.price}
                  </span>
                  <span className="text-red-600"> {product.discounted_price}</span>
                </>
              ) : (
                product.price
              )}
            </p>
          </td>
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {product.categories.length > 0
                ? product.categories
                    .map((category, index) => `${category.name}`)
                    .join(', ')
                : "Uncategorized"}
            </p>
          </td>
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
            <div className="flex gap-x-2">
              {product.sale_types.length > 0
                ? product.sale_types.map((sale_type, index) => (
                    <p key={index}>
                      {sale_type.name}
                      {product.sale_types.length - 1 !== index && ","}
                    </p>
                  ))
                : "No tags"}
            </div>
          </td>
          <td className="px-5 py-5 text-md bg-white border-b border-gray-200 ">
            <div className='flex flex-row gap-x-5'>
              <Link
              to={`/admin/products/manage/edit/${product.product_id}`} // Make sure the slug field is correctly used here
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
                   product.product_id, // Make sure the slug field is correctly used here
                 
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

export default ManageProducts;
