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
  const queryClient = useQueryClient(); 
 const PAGE_SIZE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const { data=[], isLoading, isFetching,refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories // Pass the function directly without parentheses
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

const deleteDataHandler = (categoryId) => {
  deleteCategoryMutation(categoryId);
};

  const navigate = useNavigate()
const totalPages = Math.ceil(categories?.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = categories?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

   const handleToggleVisibility = async (id, currentVisibility) => {
  try {
   
   await axios.put(`${baseUrl}/api/update_category/${id}/`, {
      visible: !currentVisibility
    });
    
    toast.success("Visibility updated successfully!");
    refetch(); 
  } catch (error) {
    console.log(error)
    toast.error("Couldn't update visibility");
  }
};
  return (
    <div className="flex flex-col gap-x-4 overflow-x-auto mx-auto w-full">
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
          searchKeyword={searchKeyword}
          tableHeaderTitleList={["Name","Description", "Images","",""]}
          isLoading={isLoading}
          isFetching={isFetching}
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
      onClick={() => handleToggleVisibility(category.category_id, category.visible)}
    >
      {category.visible ? "Visible" : "Hidden"}
    </button>
  </div>
</td>
              <td className="px-5 py-5 gap-y-4 text-md bg-white border-b border-gray-200 space-x-5">
                {/* <button
                  disabled={isLoadingDeleteData}
                  type="button"
                  className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => {
                    deleteDataHandler(category.category_id);
                  }}
                >
                  Delete
                </button> */}
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
