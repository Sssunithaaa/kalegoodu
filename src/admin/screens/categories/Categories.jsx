import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient
import { toast, ToastContainer } from "react-toastify";
import {
  
  deleteCategory,
  getAllCategories,
  
} from "../../../services/index/postCategories";
import axios from "axios";
import DataTable from "../../DataTable";
import { useState, useEffect } from "react";
import styled from 'styled-components'
import Pagination from '../../../components/Pagination'
import BackButton from "../../BackButton";
import DeleteConfirmationDialog from "../../ConfirmationDialog";
import { deleteItem } from "../../hooks/utils";
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
const Categories = () => {
  const baseUrl = import.meta.env.VITE_APP_URL;
  const [categories, setCategories] = useState([]);
  const [keyword,setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("created_at-desc");
  const queryClient = useQueryClient(); 
 const PAGE_SIZE = 5;

  const [currentPage, setCurrentPage] = useState(1);
const { data = { categories: [] }, isLoading, isFetching, refetch } = useQuery({
  queryKey: ['categories', keyword, sortOption],
  queryFn: () => getAllCategories(keyword, sortOption), // Pass the search and sort options
  keepPreviousData: true,
});

 useEffect(()=> {
  setCategories(data?.categories)
 },[data])


const [searchKeyword, setSearchKeyword] = useState("");

const searchKeywordOnChangeHandler = (event) => {
  setSearchKeyword(event.target.value);
};
const searchKeywordOnSubmitHandler = (event) => {
  event.preventDefault();
 

  if (!searchKeyword || searchKeyword.trim() === "") {

    setCategories(categories);
  } else {

    const filteredcategories = categories?.filter((category) =>
      category.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
   
    setCategories(filteredcategories);
    
  }
};

 useEffect(()=>{
    if(searchKeyword.trim()==""){
      setCategories(data?.categories)
    }
  },[searchKeyword])




  

  // Delete category mutation
const { mutate: deleteCategoryMutation, isLoading: isLoadingDeleteData } = useMutation({
  mutationFn: (categoryId) => deleteCategory(categoryId), 
  onSuccess: () => {
    toast.success("Category deleted successfully");
    queryClient.invalidateQueries(["categories"]);
    refetch()
  },
  onError: (error) => {
    toast.error("Failed to delete category");
    console.error("Error deleting category:", error.message);
  },
});

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
   const [selectedItemId, setSelectedItemId] = useState(null);
 
   const handleDeleteClick = (itemId) => {
     setSelectedItemId(itemId);
     setDeleteDialogOpen(true);
   };
 
   const handleConfirmDelete = async () => {
     const deleteUrl = `${baseUrl}/api/category/${selectedItemId}/delete/`;
     await deleteItem(deleteUrl, refetch);
     setDeleteDialogOpen(false);
   };
 


  const navigate = useNavigate()
const totalPages = Math.ceil(categories?.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = categories?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

//    const handleToggleVisibility = async (id, currentVisibility) => {
//   try {
   
//    await axios.put(`${baseUrl}/api/update_category/${id}/`, {
//       visible: !currentVisibility
//     });
    
//     toast.success("Visibility updated successfully!");
//     refetch(); 
//   } catch (error) {
//     console.log(error)
//     toast.error("Couldn't update visibility");
//   }
// };
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
    await axios.put(`${import.meta.env.VITE_APP_URL}/api/update_category/${categoryId}/`, updatedField);
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
    <div className="flex flex-col gap-x-4 overflow-x-auto mx-auto w-full">
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
          searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
          searchKeywordOnChangeHandler={searchKeywordOnChangeHandler}
          keyword={keyword}
          setKeyword={setKeyword}
          setCurrentPage={setCurrentPage}
          refetch={refetch}
          tableHeaderTitleList={["Name","Description", "Images","",""]}
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
                      src={"https://res.cloudinary.com/dgkgxokru/"+`${image.image}`} // Construct full image URL
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
                <button
                  disabled={isLoadingDeleteData}
                  type="button"
                  className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => {
                    handleDeleteClick(category.category_id);
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
        {!isLoading && (
              <div className="flex mx-auto">
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
