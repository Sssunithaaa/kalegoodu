import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from "axios";
import {
  getSingleCategory,
  updateCategory,
  createCategory,
} from "../../../services/index/postCategories";
import Dropzone from "react-dropzone";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import styled from "styled-components";
import BackButton from "../../BackButton";
const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding-inline: 10px;
  padding-block:5px;
  
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #c0392b;
  }
`;
const EditCategories = () => {
  const queryClient = useQueryClient();
  
  const { slug } = useParams();

  const isEditMode = Boolean(slug);

  const [categoryTitle, setCategoryTitle] = useState(
    isEditMode ? "Sample Category Title" : ""
  );
  const [description, setDescription] = useState(
    isEditMode ? "Sample Description" : ""
  );


  // Fetching single category (only in edit mode)
  const {data, isLoading, isError,refetch } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    onSuccess: (data) => {
   
     
      
    },
    enabled: isEditMode, // Only fetch when in edit mode
  
  });
  const baseUrl = import.meta.env.VITE_APP_URL
 useEffect(()=> {
  setCategoryTitle(data?.name || "");
      setDescription(data?.description || "");
      
      setPreviews(data?.images?.map((image)=>baseUrl+image?.image) || [null,null,null])
 },[data])
 
  

  // Mutation for updating category
  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: ({updatedData,slug}) => {
        return updateCategory({
         updatedData,
          slug
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories", slug]);
        toast.success("Category updated successfully!");
        
      },
      onError: (error) => {
        toast.error(error.message);
       
      },
    });
const [files, setFiles] = useState([null, null, null]);
const [previews, setPreviews] = useState([null, null, null]);

const handleFileChange = (acceptedFiles, index) => {
  const updatedFiles = [...files];
  updatedFiles[index] = acceptedFiles[0]; // assuming one file per dropzone
  setFiles(updatedFiles);

  const updatedPreviews = [...previews];
  updatedPreviews[index] = URL.createObjectURL(acceptedFiles[0]);
  setPreviews(updatedPreviews);
};
  // Mutation for adding category
  const { mutate: mutateAddCategory, isLoading: isLoadingAddCategory } =
    useMutation({
      mutationFn: (formData) => {
        return createCategory(formData);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories"]);
        toast.success("Category added successfully!");
      
      },
      onError: (error) => {
        toast.error(error.message);
     
      },
    });

  // Handle Submit Function for both Add and Update
  const handleSubmit = (e) => {
   e.preventDefault();

  const formData = new FormData();
  
  // Append product details to formData
  formData.append("name", categoryTitle);

  formData.append("description", description); // Ensure the key matches

  
  // Append image files
 if(!isEditMode){
   files.forEach(file => {
    if (file) {
      formData.append("images", file); // Ensure the key matches
    }
  });
 }
const newImages = files ? files.filter(file => file && file.hasOwnProperty('path')) : [];

if (newImages.length > 0) {
  newImages.forEach(file => {
    formData.append('new_images', file);
  });
}
  // Log FormData content to verify
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  if (isEditMode) {
    mutateUpdateCategory({
       updatedData:  formData,
      slug,
    });
  } else {
    mutateAddCategory(
      formData,
    );
  }
};
 const handleDelete = async (categoryImageId) => {
    try {
      await axios.delete(`${baseUrl}/api/category_image/${categoryImageId}/delete/`);
      // queryClient.invalidateQueries(["banner"]);
      toast.success("Image deleted successfully");
      refetch()
    } catch (error) {
      toast.error("Failed to delete image");
      console.log("Error deleting image:", error);
    }
  };
  

  return (
    <div className="col-span-4 py-8">
       <div className="flex w-full justify-start self-start">
    <BackButton />
  </div>
      <h4 className="text-lg leading-tight my-4">
        {isEditMode ? "Update Category" : "Add New Category"}
      </h4>
      <form onSubmit={handleSubmit} className="d-form-control w-full">
        {/* {isEditMode && ( */}
          <div className="flex md:col-span-2 flex-col gap-2 ">
            <label className="mb-2">
              Category Images:
            </label>
            
        <div className="flex md:flex-row flex-col ">
        {[0, 1, 2].map((index) => (
  <div key={index} className="mx-auto w-[100%] content-center p-2 rounded-md">
    <Dropzone
      onDrop={(acceptedFiles) => handleFileChange(acceptedFiles, index)}
      accept="image/*"
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps({
            className: `${
              previews[index] ? "bg-white" : "bg-black/20"
            } dropzone grid content-center h-full mx-auto lg:w-[80%] rounded-xl`,
          })}
        >
          <input {...getInputProps()} />
          {previews[index] ? (
            <img
              src={previews[index]}
              alt={`Preview ${index + 1}`}
              className="w-[90%] h-auto  rounded-lg content-center mx-auto"
            />
          ) : (
            <div className="p-3">
              <BsFillArrowUpCircleFill
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                  color: "black",
                }}
                className="w-full flex mx-auto"
              />
              <p className="text-center text-black font-medium">
                Drag and drop an image here, or click to select file
              </p>
            </div>
          )}
        </div>
      )}
    </Dropzone>
     {data?.images[index] && (
                            <DeleteButton  type="button" onClick={() => handleDelete(data?.images[index]?.category_image_id)}>
                              Delete
                            </DeleteButton>
                          )}
  </div>
))}
</div>

       </div>
        {/* )} */}

        <div className="flex flex-col mt-6 gap-y-2">
          <label>Category title: </label>
          <input
            value={categoryTitle}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"
            onChange={(e) => setCategoryTitle(e.target.value)}
            placeholder="Category Title"
          />
        </div>

        <div className="flex flex-col mt-4 gap-y-2">
          <label>Description: </label>
          <textarea
            value={description}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <ToastContainer/>
        {/* Created At Field (Display Only, Non-editable in edit mode)
        {isEditMode && (
          <div className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-emerald-600 font-medium font-roboto text-dark-hard mt-4">
            Created At: {new Date(createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        )} */}

        

        {/* Update/Add Button */}
        <button
          disabled={
            isLoadingUpdateCategory ||
            isLoadingAddCategory ||
            isLoading ||
            isError
          }
          type="submit"
          
          className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isEditMode ? "Update Category" : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default EditCategories;
