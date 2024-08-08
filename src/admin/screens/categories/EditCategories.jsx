import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import {
  getSingleCategory,
  updateCategory,
  createCategory,
} from "../../../services/index/postCategories";
import Dropzone from "react-dropzone";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const EditCategories = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { slug } = useParams();
  // const userState = useSelector((state) => state.user);

  const isEditMode = Boolean(slug);

  // State for all fields
  const [categoryTitle, setCategoryTitle] = useState(
    isEditMode ? "Sample Category Title" : ""
  );
  const [description, setDescription] = useState(
    isEditMode ? "Sample Description" : ""
  );
  const [createdAt, setCreatedAt] = useState(
    isEditMode ? "2024-06-18T15:50:36.589403+05:30" : new Date().toISOString()
  );
  const [status, setStatus] = useState("Active");
  const [visibility, setVisibility] = useState(true);

  // Fetching single category (only in edit mode)
  const {data, isLoading, isError } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    onSuccess: (data) => {
   
     
      
    },
    enabled: isEditMode, // Only fetch when in edit mode
  
  });
 useEffect(()=> {
  setCategoryTitle(data?.name || "Sample Category Title");
      setDescription(data?.description || "Sample Description");
      setCreatedAt(data?.created_at || "2024-06-18T15:50:36.589403+05:30");
      data?.images?.map((image)=>console.log(image)) 
      setFiles(data?.images?.map((image)=>image?.image) || [null,null,null])
 },[data])
 
  

  // Mutation for updating category
  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: ({ title, slug, description, token }) => {
        return updateCategory({
          title,
          slug,
          description,
          status,
          visibility,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories", slug]);
        toast.success("Category updated successfully!");
        navigate(`/admin/categories/manage/edit/${data._id}`, {
          replace: true,
        });
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
        navigate(`/admin/categories/manage/edit/${data._id}`, {
          replace: true,
        });
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
  files.forEach(file => {
    if (file) {
      formData.append("images", file); // Ensure the key matches
    }
  });

  // Log FormData content to verify
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  if (isEditMode) {
    mutateUpdateCategory({
      updatedData: formData,
      slug,
    });
  } else {
    mutateAddCategory(
      formData,
    );
  }
};


  return (
    <div className="col-span-4 py-8">
      <h4 className="text-lg leading-tight">
        {isEditMode ? "Update Category" : "Add New Category"}
      </h4>
      <form onSubmit={handleSubmit} className="d-form-control w-full mt-6">
        {/* {isEditMode && ( */}
          <div className="flex md:col-span-2 flex-col gap-2 ">
            <label className="mb-2">
              Category Images:
            </label>
            
        <div className="flex md:flex-row flex-col ">
        {[0, 1, 2].map((index) => (
  <div key={index} className="mx-auto w-[80%] content-center p-2 rounded-md">
    <Dropzone
      onDrop={(acceptedFiles) => handleFileChange(acceptedFiles, index)}
      accept="image/*"
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps({
            className: `${
              previews[index] ? "bg-white" : "bg-black/20"
            } dropzone grid content-center h-full mx-auto lg:w-[70%] rounded-xl`,
          })}
        >
          <input {...getInputProps()} />
          {previews[index] ? (
            <img
              src={previews[index]}
              alt={`Preview ${index + 1}`}
              className="w-[80%] h-auto my-5 rounded-lg content-center mx-auto"
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
  </div>
))}
</div>

       </div>
        {/* )} */}

        <div className="flex flex-col mt-4 gap-y-2">
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
        {/* Created At Field (Display Only, Non-editable in edit mode) */}
        {isEditMode && (
          <div className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-emerald-600 font-medium font-roboto text-dark-hard mt-4">
            Created At: {new Date(createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        )}

        

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
