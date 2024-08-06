import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient
import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryImages,
} from "../../../services/index/postCategories";
import DataTable from "../../DataTable";
import { useState, useEffect } from "react";

const Categories = () => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [combinedData, setCombinedData] = useState([]);
  const queryClient = useQueryClient(); // Use queryClient for invalidation

  // Fetch categories using react-query
  const { data: categoriesData, isLoading, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories // Pass the function directly without parentheses
});

  // Fetch images using react-query
  const { data: imagesData } = useQuery({
    queryKey: ["categoriesImages"],
    queryFn: getCategoryImages // Pass the function directly without parentheses
});

  useEffect(() => {
    if (categoriesData && imagesData) {
      const combined = categoriesData.categories.map((category) => {
        // Filter images by category_id
        const categoryImages = imagesData.filter(
          (image) => image.category === category.category_id
        );

        // Return a new object with combined data
        return {
          ...category,
          images: categoryImages,
        };
      });
      setCombinedData(combined);
    }
  }, [categoriesData, imagesData]);


  

  // Delete category mutation
  const { mutate: deleteCategoryMutation, isLoading: isLoadingDeleteData } =
    useMutation({
      mutationFn: deleteCategory, 
      onSuccess: () => {
        toast.success("Category deleted successfully");
        queryClient.invalidateQueries(["categories"]);
      },
      onError: (error) => {
        toast.error("Failed to delete category");
        console.error("Error deleting category:", error.message);
      },
});

  const deleteDataHandler = (categoryId) => {
    deleteCategoryMutation(categoryId);
  };
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-12 gap-x-4 overflow-x-auto mx-auto w-full">
      <div className="col-span-4 py-8 mx-auto">
        <h4 className="text-lg leading-tight text-center">Add New Category</h4>
        <div className="d-form-control w-full mt-6">
         
          <button
       
            type="button"
              onClick={()=>navigate("/admin/categories/add")}
            className="w-fit mt-3 bg-green-500 mx-auto text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="col-span-8 mx-auto">
        <DataTable
          pageTitle=""
          dataListName="Categories"
          searchInputPlaceHolder="Category title..."
          // searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
          // searchKeywordOnChangeHandler={searchKeywordHandler}
          // searchKeyword={searchKeyword}
          tableHeaderTitleList={["Name","Description", "Created At", "Images", ""]}
          isLoading={isLoading}
          isFetching={isFetching}
          data={combinedData}
          // setCurrentPage={setCurrentPage}
          // currentPage={currentPage}
          // headers={categoriesData?.headers}
          // userState={userState}
        >
          {combinedData?.map((category) => (
            <tr key={category.category_id}>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {category.name}
                  </p>
                </div>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {category.description}
                  </p>
                </div>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-no-wrap">
                  {new Date(category.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex md:flex-row flex-col gap-x-2 gap-y-2">
                  {category?.images.map((image) => (
                    <img
                      key={image.category_image_id}
                      src={`${import.meta.env.VITE_APP_URL}${image.image}`} // Construct full image URL
                      alt={image.alt_text || category.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ))}
                </div>
              </td>
              <td className="px-5 py-5 gap-y-4 text-sm bg-white border-b border-gray-200 space-x-5">
                <button
                  disabled={isLoadingDeleteData}
                  type="button"
                  className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => {
                    deleteDataHandler({
                      slug: category.category_id,
                      // token: userState.userInfo.token,
                    });
                  }}
                >
                  Delete
                </button>
                <Link
                  to={`/admin/categories/manage/edit/${category.category_id}`}
                  className="text-green-600 hover:text-green-900"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default Categories;
