import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  useParams } from "react-router-dom";
import 'react-quill/dist/quill.snow.css'; 
import ReactQuill from 'react-quill';
import { toast, ToastContainer } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import {
  getSingleProduct,
  updateProduct,
  createProduct,
} from "../../../services/index/products"; // Make sure to import the createProduct service
import { getAllCategories } from "../../../services/index/postCategories";
import {
  
  filterCategories,
} from "../../../utils/multiSelectTagUtils";
import Dropzone from "react-dropzone";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import axios from "axios";
import Button from "../../../components/Button";
import BackButton from "../../BackButton";
import { ClipLoader } from "react-spinners";

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};
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
const EditPost = () => {
  const { id } = useParams(); 
  const queryClient = useQueryClient();
  

  const [categories, setCategories] = useState([]); 
  const [name, setName] = useState(""); 
  const [tags, setTags] = useState([]);
  const [discountedPrice, setDiscountPrice] = useState(0); 
  const [price, setPrice] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [videoUrl, setVideoUrl] = useState("")
  const [uploading,setIsUploading] = useState(false)
  const isEditMode = Boolean(id); 
   const { data: categoriesData, isLoadingg, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories 
});
const baseUrl = import.meta.env.VITE_APP_URL
 const {data:saleTypesData,isFetching:isFetchingg} = useQuery({
  queryKey: ["saletypes"],
  queryFn: async () => {
    const response = await axios.get(`${baseUrl}/api/sale_types/`);
    
  
    return response.data?.sale_types
  },
  onError: (error)=> {
    // console.log(error)
  }
 }) 
 

 
 
  const { data:product, isLoading, isError,refetch } = useQuery({
    queryFn: () => getSingleProduct(id),
    queryKey: ["product", id],
   
    enabled: isEditMode, 
    refetchOnWindowFocus: false, 
  });
 
   const BURL = import.meta.env.VITE_APP_URL;
  useEffect(() => {
    if (product) {
      setCategories(
        product?.categories.map((item) => ({
          value: item.category_id,
          label: item.name,
        }))
      );

      setName(product.name);

      setTags(
        product?.sale_types?.map((tag) => ({
          value: tag.sale_type_id,
          label: tag.name,
        }))
      );
    
      setDescription(product.short_description);

      setPrice(product.price); 

      setDiscountPrice(product.discounted_price);
  
      // const initialFiles = product.images.map((image) => {
      //   const fileName = image.image.split("/").pop(); // Extract the file name from the URL
      //   return new File([], fileName, { type: "image/jpeg" }); // Creating a placeholder file
      // });
      // setFiles(initialFiles);
      setVideoUrl(product.video_link)
      setPreviews(
        product.images?.map((image) => "https://res.cloudinary.com/dgkgxokru/"+`${image.image}`) // Assuming image.image is a URL string
      );

    }
  }, [product]);
  useEffect(()=> {
     if(!isEditMode){
       setCategories(
        categoriesData?.categories?.map((item) => ({
          value: item.category_id,
          label: item.name,
        }))
      )

      setTags(
        saleTypesData?.map((tag) => ({
          value: tag.sale_type_id,
          label: tag.name,
        }))
      );
     }
      
  },[categoriesData,saleTypesData])

  // Mutation for updating post details
 // Mutation for updating post details
const { mutate: mutateUpdatePostDetail, isLoading: isLoadingUpdatePostDetail } = useMutation({
  mutationFn: ({ updatedData, id }) => updateProduct({ updatedData, id }),
  onMutate: () => setIsUploading(true), // Start uploading state
  onSuccess: (data) => {
    queryClient.invalidateQueries(["product", id]);
    toast.success("Product updated successfully");
    setIsUploading(false); // End uploading state on success
  },
  onError: (error) => {
    toast.error("Error updating product: " + error.message);
    setIsUploading(false); // End uploading state on error
  },
});

const { mutate: mutateAddPostDetail, isLoading: isLoadingAddPostDetail } = useMutation({
  mutationFn: (formData) => createProduct(formData),
  onMutate: () => setIsUploading(true), // Start uploading state
  onSuccess: (data) => {
    toast.success("Product added successfully");
    setName("");
    setDescription("");
    setTags([]);
    setCategories([]);
    setDiscountPrice("");
    setPrice("");
    setPreviews([]);
    setIsUploading(false); // End uploading state on success
  },
  onError: (error) => {
    console.error(error);
    toast.error("Error adding product");
    setIsUploading(false); // End uploading state on error
  },
});

 


  
  // Determine if post data is loaded
  let isPostDataLoaded = !isLoading && !isError;
 



const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Append product details to formData
  formData.append("name", name);
  formData.append("price", price);
  formData.append("discounted_price", discountedPrice);
  formData.append("short_description", description); 
   formData.append("video_link", videoUrl); 

  // Append categories as a JSON array of objects
  const categoryObjects = categories.map(category => category.value);
  formData.append("categories", JSON.stringify(categoryObjects));
  
  const tagObjects = tags.map(tag => tag.value);
  formData.append("sale_types", JSON.stringify(tagObjects));
  formData.append("quantity",10);

  if(!isEditMode){
    files.forEach((file, index) => {
    if (file) {
      formData.append(`images`, file);
    }
  }); 
  } 
  
 
const newImages = files ? files.filter(file => file && file.hasOwnProperty('path')) : [];

if (newImages.length > 0) {
  newImages.forEach(file => {
    formData.append('new_images', file);
  });
}






  setIsUploading(true)
 
  try {
    if (isEditMode) {

    mutateUpdatePostDetail({
      updatedData: formData,
      id,
    });
  } else {
    console.log(uploading)
    mutateAddPostDetail(formData);
  }
  } catch (error) {
    console.log(error)
  } finally {
    setIsUploading(false)
  }
};




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

 const handleDelete = async (productImageId) => {
    try {
      await axios.delete(`${baseUrl}/api/product_image/${productImageId}/delete/`);
      // queryClient.invalidateQueries(["banner"]);
      toast.success("Image deleted successfully");
      refetch()
    } catch (error) {
      toast.error("Failed to delete image");
      // console.error("Error deleting image:", error.message);
    }
  };
  

  return (
    <section className="w-full p-4 mt-3">
      <div className="flex w-full justify-start mb-4 self-start">
    <BackButton />
  </div>
      <div className="flex flex-wrap justify-between gap-3">
        <h1
         className="text-lg font-semibold" 
        >
          {isEditMode ? "Update Product" : "Add Product"}
        </h1>
      </div>
      <ToastContainer/>
      {isLoading && <p>Loading...</p>} {/* Show loading message */}
      {isError && <p>Something went wrong!</p>} {/* Show error message */}
      {isPostDataLoaded && (
        <form
          onSubmit={handleSubmit}
          className="md:grid flex w-full flex-col md:grid-cols-2 gap-3 mt-3"
        >
          {/* Form for post details */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="">
              Product Name:
            </label>
            <input
              type="text"
              id="name"
              className="ring-1 ring-slate-300 rounded-md px-2 py-1 focus:outline-blue-500 bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="categories" className="">
              Categories:
            </label>
           
             <CreatableSelect
              isMulti
              name="categories"
              options={categoriesData?.categories?.map((category)=>(
                {
                  value: category.category_id,
                  label: category.name
                }
              ))}
              value={categories}
               onChange={(selectedOptions) => {
    setCategories(selectedOptions); // Update with only selected options
  }}
              loadOptions={promiseOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select or create categories"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="tags" className="">
              Sale type:
            </label>
          
<CreatableSelect
  id="tags"
  isMulti
  options={saleTypesData?.map((saleType) => ({
    value: saleType.sale_type_id,
    label: saleType.name,
  }))} // Map options correctly
  value={tags}
  onChange={(selectedOptions) => {
    setTags(selectedOptions); // Update with only selected options
  }}
/>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="">
              Price:
            </label>
            <input
              type="number"
              id="price"
              className="ring-1 ring-slate-300 rounded-md px-2 py-1 focus:outline-blue-500 bg-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="discountedPrice" className="">
              Discounted Price:
            </label>
            <input
              type="number"
              id="discountedPrice"
              className="ring-1 ring-slate-300 rounded-md px-2 py-1 focus:outline-blue-500 bg-white"
              value={discountedPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Discounted Price"
              
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="description" className="">
              Description:
            </label>
           <div className="mb-4">
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="w-full h-full"
            placeholder="Add your description here..."
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                [{ 'align': [] }, { 'color': [] }],
                ['link'],
              ],
            }}
          />
        </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="videoUrl" className="">
              Video URL:
            </label>
            <input
              type="text"
              id="name"
              className="ring-1 ring-slate-300 rounded-md px-2 py-1 focus:outline-blue-500 bg-white"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Video URL"
              
            />
          </div>
          <div className="flex md:col-span-2 flex-col gap-2 ">
            <label className="">
              Product Images:
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
            <div>
            <img
              src={previews[index]}
              alt={`Preview ${index + 1}`}
              className="w-[80%] h-auto my-5 rounded-lg content-center mx-auto"
            />
           
            </div>
          ) : (
            <div className="p-3">
              <BsFillArrowUpCircleFill
                style={{
                  fontSize: "16px",
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
      {product?.images[index] && (
                            <DeleteButton type="button" onClick={() => handleDelete(product?.images[index]?.product_image_id)}>
                              Delete
                            </DeleteButton>
                          )}
  </div>
))}
</div>

       </div>
              
          <div className="md:col-span-2 flex justify-end">
        
<button
  type="submit"
  className="btn btn-outline-dark bg-blue-500 disabled:cursor-not-allowed px-4 py-2 rounded-md"
  disabled={uploading || isLoadingUpdatePostDetail || isLoadingAddPostDetail}
>
  {isEditMode
    ? isLoadingUpdatePostDetail
      ? "Updating Product..."
      : "Update Product"
    : isLoadingAddPostDetail || uploading
    ? <ClipLoader size={20}/>
    : "Add Product"}
</button>

          </div>
        </form>
      )}
    </section>
  );
};

export default EditPost;
