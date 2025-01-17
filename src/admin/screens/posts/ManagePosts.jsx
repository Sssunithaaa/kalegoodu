import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../DataTable";
import axios from "axios";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import BackButton from "../../BackButton";
import DeleteConfirmationDialog from "../../ConfirmationDialog";
const ManageProducts = () => {
  const baseUrl = import.meta.env.VITE_APP_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("created_at-desc");

  // Fetch products with pagination and search
  const fetchProducts = async ({ pageParam = 1 }) => {
    const params = new URLSearchParams();
    if (keyword) params.append("search", keyword);

    if (sortOption === "visible-true" || sortOption === "visible-false") {
      params.append("sort_by", "visible");
      params.append("sort_order", "asc");
      params.append("visible", sortOption === "visible-true");
    } else {
      const [field, order] = sortOption.split("-");
      params.append("sort_by", field);
      params.append("sort_order", order);
    }

    const url = `${baseUrl}/api/products/?page=${pageParam}&${params.toString()}`;
    console.log(url); // Debugging URL
    const { data } = await axios.get(url);
    return data;
  };

  const { data: productsData = { products: [], count: 0 }, isLoading, refetch } = useQuery({
    queryKey: ["products", currentPage, keyword, sortOption],
    queryFn: () => fetchProducts({ pageParam: currentPage }),
    keepPreviousData: true,
  });

  console.log(productsData);
  const products = productsData?.results?.products || [];
  const totalPages = Math.ceil(productsData.count / 4); // Adjust page size accordingly

  // Handle search input changes
  const searchKeywordOnChangeHandler = (event) => {
    setSearchKeyword(event.target.value);
  };

  const searchKeywordOnSubmitHandler = (event) => {
    event.preventDefault();
    setKeyword(searchKeyword);
    setCurrentPage(1); // Reset to first page on search
    refetch();
  };

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const deleteUrl = `${baseUrl}/api/product/${selectedItemId}/delete/`;
    await deleteItem(deleteUrl, refetch);
    setDeleteDialogOpen(false);
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

  const sortOptions = [
     { label: "Visible", value: "visible-true" },
    { label: "Hidden", value: "visible-false" },
    { label: "Date, new to old", value: "created_at-desc" },
    { label: "Date, old to new", value: "created_at-asc" },
    { label: "Price, low to high", value: "price-asc" },
    { label: "Price, high to low", value: "price-desc" },
    { label: "Alphabetically, A-Z", value: "name-asc" },
    { label: "Alphabetically, Z-A", value: "name-desc" },
   
  ];
  return (
    <div className="overflow-y-auto overflow-x-auto example w-full">
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />

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
        url="/admin/products/add"
        sortOptions={sortOptions}
        sortOption={sortOption}
        setSortOption={setSortOption}
        keyword={keyword}
        setKeyword={setKeyword}
        refetch={refetch}
        setCurrentPage={setCurrentPage}
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
                  onClick={() => handleDeleteClick(product.product_id)}
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
