import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../DataTable';
import { useDataTable } from '../../hooks/useDataTable';
import { deleteProduct } from '../../../services/index/products'; 
import axios from 'axios';

const API_URL = 'https://kalegoodupractice.pythonanywhere.com/api'; // Base URL

const ManageProducts = () => {
  // const {
  //   currentPage,
  //   searchKeyword,
  //   isLoading,
  //   isFetching,
  //   isLoadingDeleteData,
  //   queryClient,
  //   searchKeywordHandler,
  //   submitSearchKeywordHandler,
  //   deleteDataHandler,
  //   setCurrentPage,
  // } = useDataTable();

  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch products and images from the API
    const fetchData = async () => {
      try {
        const [productResponse, imageResponse] = await Promise.all([
          axios.get(`${API_URL}/products/`),
          axios.get(`${API_URL}/product_images/`),
        ]);

        const { products } = productResponse.data;
        const { product_images } = imageResponse.data;

        // Map images to products
        const productsWithImages = products.map((product) => {
          const productImages = product_images.filter(
            (image) => image.product === product.product_id
          );
          return { ...product, images: productImages };
        });

        setProducts(productsWithImages);
        setImages(product_images);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const url = import.meta.env.VITE_APP_URL
  const isLoading = false;
   const isFetching = false;
    const isLoadingDeleteData = false;
    console.log(products)
  return (
    <DataTable
      pageTitle="Manage Products"
      dataListName="Products"
      searchInputPlaceHolder="Product name..."
      // searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      // searchKeywordOnChangeHandler={searchKeywordHandler}
      // searchKeyword={searchKeyword}
      tableHeaderTitleList={["Images", "Name", "Description", "Price", "Discount Price", "Categories", "Sale Type"," "]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={products}
      // setCurrentPage={setCurrentPage}
      // currentPage={currentPage}
    >
      {products.map((product) => (
        <tr key={product.product_id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex flex-wrap gap-x-3">
                {
                  product.images.map((image)=> (
                   
                  <img
                    src={
                      product.images.length > 0
                        ? `${url}${image.image}` // Construct full image URL
                        : 'path/to/sampleProductImage' // Replace with your sample image path
                    }
                    alt={product.name}
                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                  />
              
                  ))
                }
              </div>
             
            </div>
          </td>
         <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{product.short_description}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{product.price}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
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
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {product.categories.length > 0
                ? product.categories
                    .map((category, index) => `${category.name}`)
                    .join(', ')
                : "Uncategorized"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
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
          <td className="px-5 flex flex-row py-14  text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: product.slug, // Make sure the slug field is correctly used here
                  token: userState.userInfo.token, // Ensure token handling is implemented
                });
              }}
            >
              Delete
            </button>
            <Link
              to={`/admin/products/manage/edit/${product.slug}`} // Make sure the slug field is correctly used here
              className="text-green-600 hover:text-green-900"
            >
              Edit
            </Link>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default ManageProducts;
