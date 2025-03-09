import { Link } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query"; // Import useQueryClient
import {  ToastContainer } from "react-toastify";
import {
  getAllCategories,
} from "../../../services/index/postCategories";
import DataTable from "../../DataTable";
import { useState } from "react";
import Pagination from '../../../components/Pagination'
import BackButton from "../../BackButton";
import DeleteConfirmationDialog from "../../ConfirmationDialog";
import { deleteItem } from "../../hooks/utils";
import api from "../../../services/index/api";

const Categories = () => {
  const baseUrl = import.meta.env.VITE_APP_URL;
  const [keyword,setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("created_at-desc");
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data = { categories: [] }, isLoading, isFetching, refetch } = useQuery({
  queryKey: ['categories', keyword, sortOption],
  queryFn: () => getAllCategories(keyword, sortOption), // Pass the search and sort options
  keepPreviousData: true,
  refetchOnWindowFocus: false});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
 
  const handleDeleteClick = (itemId) => {
     setSelectedItemId(itemId);
     setDeleteDialogOpen(true);
  };
 
  const handleConfirmDelete = async () => {
     const deleteUrl = `/api/category/${selectedItemId}/delete/`;
     await deleteItem(deleteUrl, refetch);
     setDeleteDialogOpen(false);
  };
 
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const totalPages = Math.ceil(data?.categories?.length / PAGE_SIZE);
  const paginatedData = data?.categories?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleToggleVisibility = async (categoryId, currentValue,category) => {
    updateCategory(categoryId, { visible: !currentValue,header:category.header,home_page:category.home_page });
  }
  const handleToggleHeader = (categoryId, currentValue,category) => {
    updateCategory(categoryId, { header: !currentValue,visible:category.visible,home_page:category.home_page });
  };

  const handleToggleHomePage = (categoryId, currentValue,category) => {
    updateCategory(categoryId, { home_page: !currentValue,visible:category.visible,header:category.header });
  };

  const updateCategory = async (categoryId, updatedField) => {
    try {
      await api.put(`/api/update_category/${categoryId}/`, updatedField);
      refetch(); // Refresh data after update
    } catch (error) {
      console.error("Error updating category");
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
    <div className="example flex flex-col gap-x-4 overflow-x-auto mx-auto w-full">
     <DeleteConfirmationDialog
     open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
     />
 <div className="flex w-full justify-start self-start">
    <BackButton />
  </div>      
      <ToastContainer/>
      <div className="col-span-8 mx-auto">
        <DataTable
          pageTitle=""
          dataListName="Categories"
          searchInputPlaceHolder="Category title..."
          // searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
          // searchKeywordOnChangeHandler={searchKeywordOnChangeHandler}
          keyword={keyword}
          setKeyword={setKeyword}
          setCurrentPage={setCurrentPage}
          refetch={refetch}
          tableHeaderTitleList={["Name","Description", "Images","","","",""]}
          isLoading={isLoading}
          isFetching={isFetching}
          sortOptions={sortOptions}
          sortOption = {sortOption}
          setSortOption = {setSortOption}
          data={data}
          url="/admin/categories/add"
          
         
        >
          {paginatedData?.map((category) => (
            <tr key={category.category_id}>
              <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {category.name}
                  </p>
                </div>
              </td>
              <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {category.description}
                  </p>
                </div>
              </td>
             
              <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
                <div className="flex md:flex-row flex-col gap-x-2 gap-y-2">
                  {category?.images.map((image) => (
                    <img
                      key={image.category_image_id}
                      src={import.meta.env.VITE_CLOUD_URL+`${image.image}`} // Construct full image URL
                      alt={image.alt_text || category.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ))}
                </div>
              </td>
              <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
  <div className="flex items-center">
    <button
      className={`py-1 px-4 rounded ${category.visible ? "bg-green-500" : "bg-red-500"} text-white`}
      onClick={() => handleToggleVisibility(category.category_id, category.visible,category)}
    >
      {category.visible ? "Visible" : "Hidden"}
    </button>
  </div>
</td>
 <td className="px-5 py-5 text-md bg-white border-b border-gray-200">
      <div className="flex flex-col gap-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={category.header}
            onChange={() => handleToggleHeader(category.category_id, category.header,category)}
          />
          <span>Header</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={category.home_page}
            onChange={() => handleToggleHomePage(category.category_id, category.home_page,category)}
          />
          <span>Home Page</span>
        </label>
      </div>
    </td>
              <td className="px-5 py-5 gap-y-4 text-md bg-white border-b border-gray-200 space-x-5">
                 <Link
                  to={`/admin/sub-categories/manage/${category.category_id}`}
                  className="text-blue-600 max-w-4 hover:text-green-900"
                >
                  Manage <br/>sub-categories
                </Link>
                
                <Link
                  to={`/admin/categories/manage/edit/${category.category_id}`}
                  className="text-green-600 hover:text-green-900"
                >
                  Edit
                </Link>
                <button
                  
                  type="button"
                  className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => {
                    handleDeleteClick(category.category_id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
        {!isLoading && (
              <div className="flex mx-auto justify-center">
                <Pagination onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPageCount={totalPages}/>
              </div>
            )}
      </div>

    </div>
  );
};

export default Categories;
