import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../DataTable";
import axios from "axios";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAllProductss } from "../../../services/index/products";
import { toast, ToastContainer } from "react-toastify";
import BackButton from "../../BackButton";

const ManageProducts = () => {
  const baseUrl = import.meta.env.VITE_APP_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch products with pagination and search
  const fetchProducts = async (page, keyword) => {
    try {
      const response = await getAllProductss(page, keyword);
      return response;
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

  const {
    data: productsData = { products: [], totalCount: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["productss", currentPage, searchKeyword],
    queryFn: () => fetchProducts(currentPage, searchKeyword),
    keepPreviousData: true,
  });

  const products = productsData.products || [];
  const totalPages = Math.ceil(productsData.totalCount/4); // Assuming 10 items per page

  // Handle search input changes
  const searchKeywordOnChangeHandler = (event) => {
    setSearchKeyword(event.target.value);
  };

  const searchKeywordOnSubmitHandler = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to first page on search
    refetch();
  };

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Delete product
  const deleteDataHandler = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/product/${id}/delete/`);
      toast.success("Product deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete product. Try again!");
    }
  };

  // Toggle product visibility
  const handleToggleVisibility = async (id, currentVisibility) => {
    try {
      await axios.put(`${baseUrl}/api/update_product/${id}/`, {
        visible: !currentVisibility,
      });
      toast.success("Visibility updated successfully!");
      refetch();
    } catch (error) {
      toast.error("Couldn't update visibility");
    }
  };

  return (
    <div className="overflow-y-auto overflow-x-auto w-full">
      <div className="flex w-full justify-start ml-4 self-start">
        <BackButton />
      </div>
      <DataTable
        dataListName="Products"
        searchInputPlaceHolder="Product name..."
        searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
        searchKeywordOnChangeHandler={searchKeywordOnChangeHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={[
          "Name",
          "Price",
          "Discount Price",
          "Quantity",
          "Categories",
          " ",
        ]}
        isLoading={isLoading}
      >
        <ToastContainer />
        {products?.map((product) => (
          <tr key={product.product_id}>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{product.price}</p>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">
                {product.discounted_price !== "0" ? (
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
              <p className="text-gray-900 whitespace-no-wrap">{product.quantity}</p>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">
                {product.categories.length > 0
                  ? product.categories.map((cat) => cat.name).join(", ")
                  : "Uncategorized"}
              </p>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <button
                className={`py-1 px-4 rounded ${
                  product?.visible ? "bg-green-500" : "bg-red-500"
                } text-white`}
                onClick={() =>
                  handleToggleVisibility(product?.product_id, product?.visible)
                }
              >
                {product?.visible ? "Visible" : "Hidden"}
              </button>
            </td>
            <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
              <div className="flex flex-row gap-x-5">
                <Link
                  to={`/admin/products/manage/edit/${product.product_id}`}
                  className="text-green-600 hover:text-green-900"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-900"
                  onClick={() => deleteDataHandler(product.product_id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
      {!isLoading && (
        <Pagination
          onChange={handlePageChange}
          page={currentPage}
          count={totalPages}
          variant="outlined"
          shape="rounded"
          className="mt-5 flex justify-center"
        />
      )}
    </div>
  );
};

export default ManageProducts;
