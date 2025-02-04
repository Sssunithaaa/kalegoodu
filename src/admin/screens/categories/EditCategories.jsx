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
import { addImage,updateImage } from "../../api/ImageApi";
import Dropzone from "react-dropzone";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import styled from "styled-components";
import BackButton from "../../BackButton";
import { ClipLoader } from "react-spinners";
import Button from "../../../components/Button";
import { set } from "react-hook-form";
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
const UpdateButton = styled.button`
  background-color: #0096FF;
  color: white;
  border: none;
  border-radius: 5px;
  padding-inline: 10px;
  padding-block:5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #0096FA;
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

  const [visible,setVisible] = useState(false)
  const [header,setHeader] = useState(false);
  const [homePage,setHomePage] = useState(false);
  const [loading,setIsLoading] = useState(false)

  // Fetching single category (only in edit mode)
  const {data, isLoading, isError,refetch } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    enabled: isEditMode, // Only fetch when in edit mode
  
  });
  const baseUrl = import.meta.env.VITE_APP_URL
 useEffect(()=> {
  setCategoryTitle(data?.name || "");
      setDescription(data?.description || "");
      
      setPreviews(data?.images?.map((image)=>"https://res.cloudinary.com/dgkgxokru/"+image?.image) || [null,null,null])
      setVisible(data?.visible)
      setHeader(data?.header)
      setHomePage(data?.home_page)
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
        onMutate: () => setIsLoading(true),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories", slug]);
        toast.success("Category updated successfully!");
        setIsLoading(false)
        refetch()
        
      },
      onError: (error) => {
        toast.error(error.message);
       
      },
    });
const [files, setFiles] = useState([null, null, null]);
const [previews, setPreviews] = useState([null, null, null]);
const handleFileChange = (acceptedFiles, index) => {
  const allowedTypes = ["image/jpeg", "image/png","image/webp"];
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes

  if (acceptedFiles.length > 0) {
    const file = acceptedFiles[0];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size exceeds 10MB. Please upload a smaller image.");
      return;
    }

    const updatedFiles = [...files];
    updatedFiles[index] = file;
    setFiles(updatedFiles);

    const updatedPreviews = [...previews];
    updatedPreviews[index] = URL.createObjectURL(file);
    setPreviews(updatedPreviews);
  }
};


const navigate = useNavigate()
  // Mutation for adding category
  const { mutate: mutateAddCategory, isLoading: isLoadingAddCategory } =
    useMutation({
      mutationFn: (formData) => {
        return createCategory(formData);
      },
      onMutate: () => {
        setIsLoading(true)
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories"]);
        toast.success("Category added successfully!");
        setIsLoading(false)
        setTimeout(()=>{
          navigate("/admin/categories/manage")
        },2000)
      },
      onError: (error) => {
        toast.error(error.message);
     
      },
    });
  // Handle Submit Function for both Add and Update
  const handleSubmit = (e) => {
   e.preventDefault();
  
  const formData = new FormData();
  formData.append("name", categoryTitle);
  formData.append("description", description); // Ensure the key matches
  formData.append("visible", visible); // Ensure the key matches
  formData.append("header",header ? header : false);
  formData.append("home_page",homePage ? homePage : false);
  console.log(header)
  console.log(homePage)
  if(!isEditMode){
   files.forEach(file => {
    if (file) {
      formData.append("images", file); // Ensure the key matches
      formData.append("visible",true);
    }
  });
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


const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(false);

  const handleUpdate = (productImageId, file) => {
    updateImage(baseUrl, productImageId, file, refetch, setIsUpdatingImage,`update_category_image/${productImageId}/`);
  };

  const handleAddImage = (productImageId, file) => {
    addImage(baseUrl, productImageId, file, refetch, setIsAddingImage,`add_category_image/${productImageId}/`);
  };


 const handleDelete = async (categoryImageId) => {
    try {
      await axios.delete(`${baseUrl}/api/category_image/${categoryImageId}/delete/`);
      // queryClient.invalidateQueries(["banner"]);
      toast.success("Image deleted successfully");
      refetch()
    } catch (error) {
      toast.error("Failed to delete image");
      // console.log("Error deleting image:", error);
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
            
        <div className="flex ">
        {[0].map((index) => (
  <div key={index} className="mx-auto content-center p-2 rounded-md">
    <Dropzone
      onDrop={(acceptedFiles) => handleFileChange(acceptedFiles, index)}
      accept="image/jpeg, image/png,image/webp"
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps({
            className: `${
              previews[index] ? "bg-white" : "bg-black/20"
            } dropzone grid content-center h-full mx-auto lg:w-[100%] rounded-xl`,
          })}
        >
          <input {...getInputProps()} />
          {previews[index] ? (
            <img
              src={previews[index]}
              alt={`Preview ${index + 1}`}
              className="w-[100%] h-auto  rounded-lg content-center mx-auto"
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
                             <em>(Only *.jpeg, *.png and *.webp images will be accepted)</em>

            </div>
          )}
        </div>
      )}
    </Dropzone>
      <div className="flex flex-row gap-x-2">
             {data?.images[index] && files[index] ? (
                                 <div className='flex flex-row gap-x-2'> 
                           <UpdateButton className="disabled:cursor-not-allowed" disabled={isUpdatingImage} type="button" onClick={() => handleUpdate(data?.images[index]?.category_image_id, files[index])}>
                          {isUpdatingImage ? <ClipLoader size={20}></ClipLoader> : " Update"}
                         </UpdateButton>
                      
                     </div>
                               ) : ( files[index] && isEditMode && ( <div>
                                  <UpdateButton className="disabled:cursor-not-allowed" disabled={isAddingImage} type="button" onClick={() => handleAddImage(data?.category_id, files[index])}>
                          {isAddingImage ? <ClipLoader size={20}></ClipLoader> : "Add Image"}
                         </UpdateButton>
                                 </div> )) }
                                  <DeleteButton type="button" onClick={() => handleDelete(data?.images[index]?.category_image_id)}>
                       Delete
                     </DeleteButton>
           </div>
  </div>
))}
</div>

       </div>
        {/* )} */}

        <div className="flex flex-col mt-6 gap-y-2">
  <label className="font-medium">
    Category Title: 
    <span className="text-red-500 text-2xl font-bold ml-1">*</span>
  </label>
  <input
    required
    aria-required
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
       <div className="mb-4 mt-4">
  <label htmlFor="visibility" className="flex flex-row text-gray-700 text-lg font-medium mb-2">
    <span>Category visibility: </span>
    <input
      type="checkbox"
      id="visibility"
      checked={visible}
      onChange={(e) => setVisible(e.target.checked)}
      className="mx-2 border border-gray-300 rounded-md shadow-sm"
    />
    {visible ? "Visible" : "Hidden"}
  </label>
</div>
{
  visible && <div>
    <div className="mb-4">
  <label htmlFor="header" className="flex flex-row text-gray-700 text-lg font-medium mb-2">
        <span>Header category: </span>

    <input
      type="checkbox"
      id="header"
      checked={header}
      onChange={(e) => setHeader(e.target.checked)}
      className="mx-2 border border-gray-300 rounded-md shadow-sm"
    />
    {visible ? "Header" : "Hidden"}
  </label>
</div>
<div className="mb-4">
  <label htmlFor="homePage" className="flex flex-row text-gray-700 text-lg font-medium mb-2">
        <span>Homepage category: </span>

    <input
      type="checkbox"
      id="homePage"
      checked={homePage}
      onChange={(e) => setHomePage(e.target.checked)}
      className="mx-2 border border-gray-300 rounded-md shadow-sm"
    />
    {visible ? "Homepage" : "Hidden"}
  </label>
</div>

  </div>
}
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
        <Button
          disabled={
            isLoadingUpdateCategory ||
            isLoadingAddCategory ||
            isLoading ||
            isError ||
            loading
          }
          
          type="submit"
          
          className=" px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          { isEditMode ? loading ? <ClipLoader size={20}/> :   "Update Category" : "Add Category"}
        </Button>
      </form>
    </div>
  );
};

export default EditCategories;
