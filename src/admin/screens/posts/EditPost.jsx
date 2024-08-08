import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import {
  getSingleProduct,
  updateProduct,
  createProduct,
} from "../../../services/index/products"; // Make sure to import the createProduct service
import { getAllCategories } from "../../../services/index/postCategories";
import {
  categoryToOption,
  filterCategories,
} from "../../../utils/multiSelectTagUtils";
import Dropzone from "react-dropzone";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import AddImage from "./AddImage";

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
  const { slug } = useParams(); // Get the slug from URL params
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // Categories state
  const [name, setName] = useState(""); // name state
  const [tags, setTags] = useState([]); // Tags state
  const [discountedPrice, setDiscountPrice] = useState(""); // Slug state
  const [price, setPrice] = useState(""); // price state
  const [description, setDescription] = useState(""); // description content state

  const isEditMode = Boolean(slug); // Determine if we are in edit mode
  
  // Fetching post details with react-query
  const { data:product, isLoading, isError } = useQuery({
    queryFn: () => getSingleProduct({ slug }),
    queryKey: ["blog", slug],
   
    enabled: isEditMode, // Only run the query if we are in edit mode
    refetchOnWindowFocus: false, // Do not refetch on window focus
  });
   const BURL = import.meta.env.VITE_APP_URL;
  useEffect(() => {
    if (product) {
      setCategories(
        product.categories.map((item) => ({
          value: item.category_id,
          label: item.name,
        }))
      );

      setName(product.name);

      setTags(
        product.sale_types.map((tag) => ({
          value: tag.sale_type_id,
          label: tag.name,
        }))
      );

      setDescription(product.short_description);

      setPrice(product.price); // Set price from sample data

      setDiscountPrice(product.discounted_price);
      // Set files and previews
      const initialFiles = product.images.map((image) => {
        const fileName = image.image.split("/").pop(); // Extract the file name from the URL
        return new File([], fileName, { type: "image/jpeg" }); // Creating a placeholder file
      });
      setFiles(initialFiles);
      
      setPreviews(
        product.images?.map((image) => `${BURL}${image.image}`) // Assuming image.image is a URL string
      );

    }
  }, [product]);

  // Mutation for updating post details
  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updateProduct({
        updatedData,

        token,
      });
    },
    onSuccess: (data) => {
      // Invalidate queries to refetch updated post data
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated successfully"); // Show success toast
      navigate(`/admin/posts/manage/edit/${data.slug}`, { replace: true }); // Navigate to updated post
    },
    onError: (error) => {
      toast.error("Error updating post: " + error.message); // Show error toast

    },
  });

  // Mutation for adding new product details
  const {
    mutate: mutateAddPostDetail,
    isLoading: isLoadingAddPostDetail,
  } = useMutation({
    mutationFn: (formData) => {
      return createProduct(
        formData,
      );
    },
    onSuccess: (data) => {
      toast.success("Product added successfully");
      // navigate(`/admin/products/manage/edit/${data.slug}`, { replace: true });
    },
    onError: (error) => {
      toast.error("Error adding product: " + error.message);
     
    },
  });


 
  // Handle image deletion
  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };
  
  // Determine if post data is loaded
  let isPostDataLoaded = !isLoading && !isError;
 



const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Append product details to formData
  formData.append("name", name);
  formData.append("price", price);
  formData.append("discounted_price", discountedPrice);
  formData.append("short_description", description); // Ensure the key matches

  // Append categories as a JSON array of objects
  const categoryObjects = categories.map(category => (1));

  formData.append("categories", JSON.stringify(categoryObjects));
  // formData.append("category",1)
  
  
  const tagObjects = tags.map(tag => (1));

  formData.append("sale_types", JSON.stringify(tagObjects));
  // formData.append("sale_type",1)

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
    mutateUpdatePostDetail({
      updatedData: formData,
      slug,
    });
  } else {
    mutateAddPostDetail(
      formData,
    );
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


  

  return (
    <section className=" p-4 mt-3">
      <div className="flex flex-wrap justify-between gap-3">
        <Link
          to="/admin/products/manage"
          className="btn btn-outline-dark bg-blue-500 px-2 py-1 rounded-md"
        >
          Manage Products
        </Link>
      </div>
      <ToastContainer/>
      {isLoading && <p>Loading...</p>} {/* Show loading message */}
      {isError && <p>Something went wrong!</p>} {/* Show error message */}
      {isPostDataLoaded && (
        <form
          onSubmit={handleSubmit}
          className="md:grid flex flex-col md:grid-cols-2 gap-3 mt-3"
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
              options={categories}
              onChange={setCategories}
              loadOptions={promiseOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select or create categories"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="tags" className="">
              Tags:
            </label>
            <CreatableSelect
              isMulti
              name="tags"
              options={tags}
              onChange={setTags}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select or create tags"
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
              required
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="description" className="">
              Description:
            </label>
            <textarea
              id="description"
              className="ring-1 ring-slate-300 rounded-md px-2 py-1 focus:outline-blue-500 bg-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              required
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
            <img
              src={previews[index]}
              alt={`Preview ${index + 1}`}
              className="w-[80%] h-auto my-5 rounded-lg content-center mx-auto"
            />
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
  </div>
))}
</div>

       </div>
              
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="btn btn-outline-dark bg-blue-500 px-4 py-2 rounded-md"
              disabled={isLoadingUpdatePostDetail || isLoadingAddPostDetail}
            >
              {isEditMode ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EditPost;
