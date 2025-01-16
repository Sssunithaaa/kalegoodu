import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  useNavigate, useParams } from "react-router-dom";
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
import { updateImage } from "../../api/ImageApi";
import { addImage } from "../../api/ImageApi";
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
  const [quantity,setQuantity] = useState(1);
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
      setQuantity(product?.quantity)

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

 const handleMutationError = (error) => {
  setIsUploading(false);
  toast.error("An error occurred: " + error.message);
  console.error(error);
};

const { mutate: mutateUpdatePostDetail, isLoading: isLoadingUpdatePostDetail } = useMutation({
  mutationFn: ({ updatedData, id }) => updateProduct({ updatedData, id }),
  onMutate: () => setIsUploading(true),
  onSuccess: () => {
    queryClient.invalidateQueries(["product", id]);
    toast.success("Product updated successfully");
    setIsUploading(false);
  },
  onError: handleMutationError
});

const navigate = useNavigate()

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
    setVideoUrl("");
    setQuantity(1);
    setIsUploading(false); // End uploading state on success
    setTimeout(()=>{
      navigate("/admin/products/manage")
    },2000)
  },
  onError: (error) => {
    console.log(error);
    toast.error("Error adding product");
    setIsUploading(false); // End uploading state on error
  },
});

 

  useEffect(()=>{
    if(!isEditMode){
      setName("");
      setDescription("");
      setDiscountPrice("");
      setPrice("");
      setVideoUrl("")
      setPreviews([null,null,null])
    }
  },[isEditMode])
  
  // Determine if post data is loaded
  let isPostDataLoaded = !isLoading && !isError;
 



const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  console.log(discountedPrice)
  formData.append("name", name);
  formData.append("price", price);
  formData.append("discounted_price", discountedPrice || 0);
  formData.append("short_description", description); 
if (videoUrl) {
  formData.append("video_link", videoUrl);
}


  // Append categories as a JSON array of objects
  const categoryObjects = categories.map(category => category.value);
  formData.append("categories", JSON.stringify(categoryObjects));
  
  const tagObjects = tags.map(tag => tag.value);
  formData.append("sale_types", JSON.stringify(tagObjects));
  formData.append("quantity",quantity);
  formData.append("visible",true);

  if(!isEditMode){
    files.forEach((file, index) => {
    if (file) {
      formData.append(`images`, file);
      formData.append("visible",true);
    }
  }); 
  } 
  // for(let [key,value] of formData.entries()){
  //   console.log(key+" "+value)
  // }
 





  setIsUploading(true)
 
  try {
    if (isEditMode) {

    mutateUpdatePostDetail({
      updatedData: formData,
      id,
    });
    refetch()
  } else {
    
    mutateAddPostDetail(formData);
  }
  } catch (error) {
   
  } finally {
    setIsUploading(false);
    
  }
};




const [files, setFiles] = useState([null, null, null]);
const [previews, setPreviews] = useState([null, null, null]);
const handleFileChange = (acceptedFiles, index) => {
  const updatedFiles = [...files];
  updatedFiles[index] = acceptedFiles[0]; 
  setFiles(updatedFiles);

  const updatedPreviews = [...previews];
  updatedPreviews[index] = URL.createObjectURL(acceptedFiles[0]);
  setPreviews(updatedPreviews);
  
};


const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(false);

  const handleUpdate = (productImageId, file) => {
    updateImage(baseUrl, productImageId, file, refetch, setIsUpdatingImage,`update_product_image/${productImageId}/`);
  };

  const handleAddImage = (productImageId, file) => {
    addImage(baseUrl, productImageId, file, refetch, setIsAddingImage,`add_product_image/${productImageId}/`);
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
          <div className="flex md:col-span-2 flex-col gap-2 my-5">
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
                  marginBottom: "5px",
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
      <div className="flex flex-row gap-x-2 ">
        {product?.images[index] && files[index] ? (
                            <div className='flex flex-row gap-x-2'> 
                      <UpdateButton className="disabled:cursor-not-allowed" disabled={isUpdatingImage} type="button" onClick={() => handleUpdate(product?.images[index]?.product_image_id, files[index])}>
                     {isUpdatingImage ? <ClipLoader size={20}></ClipLoader> : " Update"}
                    </UpdateButton>
                 
                </div>
                          ) : ( files[index] && isEditMode && ( <div>
                             <UpdateButton className="disabled:cursor-not-allowed" disabled={isAddingImage} type="button" onClick={() => handleAddImage(product?.product_id, files[index])}>
                     {isAddingImage ? <ClipLoader size={20}></ClipLoader> : "Add Image"}
                    </UpdateButton>
                            </div> )) }
                             <DeleteButton type="button" onClick={() => handleDelete(product?.images[index]?.product_image_id)}>
                  Delete
                </DeleteButton>
      </div>
  </div>
))}
</div>

       </div>
          {/* Form for post details */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="">
              Product Name:
                  <span className="text-red-500 text-2xl font-bold ml-1">*</span>

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
                  <span className="text-red-500 text-2xl font-bold ml-1">*</span>

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
          <div className="flex flex-col gap-2">
            <label htmlFor="quantity" className="">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              className="ring-1 ring-slate-300 rounded-md px-2 py-1 focus:outline-blue-500 bg-white"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              
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
  placeholder="Add your content here..."
  modules={{
    toolbar: [
      // Headings and Subheadings
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      
      // Font Style, Size, and Weight
      [{ font: [] }, { size: [] }],
      
      // Text Formatting
      ['bold', 'italic', 'underline', 'strike'],
      
      // Text Color and Background Color
      [{ color: [] }, { background: [] }],
      
      // Alignment Options
      [{ align: [] }],
      
      // Lists and Indents
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      
      // Inline Blocks
      ['blockquote', 'code-block'],
      
      // Links and Images
      ['link', 'image', 'video'],

      // Clear Formatting
      ['clean'],
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
          
              
          <div className="md:col-span-2 mt-5 flex justify-end">
        
<Button
  type="submit"
  className="btn btn-outline-dark bg-blue-500 disabled:cursor-not-allowed px-4 py-2 rounded-md"
  disabled={uploading || isLoadingUpdatePostDetail || isLoadingAddPostDetail}
>
  {isEditMode
    ? uploading
      ? <ClipLoader size={20}/>
      : "Update Product"
    : isLoadingAddPostDetail || uploading
    ? <ClipLoader size={20}/>
    : "Add Product"}
</Button>

          </div>
        </form>
      )}
    </section>
  );
};

export default EditPost;
