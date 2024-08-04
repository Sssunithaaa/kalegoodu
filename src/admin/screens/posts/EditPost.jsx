import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import CreatableSelect from 'react-select/creatable';
import { getSingleProduct, updateProduct } from "../../../services/index/products";
import { getAllCategories } from "../../../services/index/postCategories";
import { categoryToOption, filterCategories } from "../../../utils/multiSelectTagUtils";
import { stables } from "../../../constants";
import "react-toastify/dist/ReactToastify.css";

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
  const [discountedPrice, setDiscountPrice] = useState(slug); // Slug state
  const [price, setPrice] = useState(""); // price state
  const [description, setDescription] = useState(""); // description content state


  // Fetching post details with react-query
  const { data } = useQuery({
    queryFn: () => getSingleProduct({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      
      setCategories(product?.categories.map((item) => item._id));
      setName(product?.name);
      setTags(product?.tags);
      setDescription(product?.description);
      setPrice(product?.price); // Set price from sample data
    },
    refetchOnWindowFocus: false, // Do not refetch on window focus
  });
  const isLoading = false;
  const isError=false;
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
      console.log(error);
    },
  });

  const [newImage, setNewImage] = useState(null); // State for the new image file

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setNewImage(file);
};

// Handle image upload
const handleImageUpload = async () => {
  if (!newImage) return;

  const formData = new FormData();
  formData.append("image", newImage);

  // try {
    // // Replace with your upload service or API call
    // const response = await fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    // const result = await response.json();
    // if (result.success) {
      // Update product data with new image
      const updatedImages = [...product.images, {
        product_image_id: 3, // Assuming response provides imageId
        product: product.product_id,
        product_name: product.name,
        image: `/media/product_images/${product.name}`, // URL of the uploaded image
        alt_text: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }];

      // Update the state or make a mutation to update product
      // // Assuming you have a function to update the product
      // await updateProduct({ ...product, images: updatedImages });

      // Reset the new image state
      setNewImage(null);
      toast.success("Image uploaded successfully");
    // } else {
    //   toast.error("Failed to upload image");
    // }
  // } catch (error) {
  //   toast.error("Error uploading image: " + error.message);
  // }
};

  // Handle image deletion
  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  // Determine if post data is loaded
  let isPostDataLoaded = !isLoading && !isError;
  useEffect(() => {
    setCategories(product?.categories.map((category)=>({value: category.category_id,label: category.name}))); // Use categoryToOption
    setTags(product?.sale_types.map((tag) => ({ value: tag.sale_type_id, label: tag.name })))
    setPrice(product?.price);
    setDescription(product?.short_description)
    setName(product?.name)
    setDiscountPrice(product?.discounted_price)
  }, []);

  const product = {
    product_id: 1,
    name: "Glided Plume Metal Wall Art",
    price: "Rs. 7999",
    discounted_price: "0",
    short_description: "A Wall art filled with Featers",
    categories: [
      {
        category_id: 2,
        name: "Metal Wall Art",
        description: "Metal Wall Art",
        created_at: "2024-06-18T15:55:55.901372+05:30",
        updated_at: "2024-06-18T15:56:07.651465+05:30",
      },
    ],
    sale_types: [
      {
        sale_type_id: 1,
        name: "New Arrivals",
      },
      {
        sale_type_id: 2,
        name: "Best Seller",
      },
    ],
    images: [
      {
        product_image_id: 1,
        product: 1,
        product_name: "Glided Plume Metal Wall Art",
        image: "/media/product_images/Glided%20Plume%20Metal%20Wall%20Art/metalwall1.webp",
        alt_text: null,
        created_at: "2024-06-18T15:58:10.981199+05:30",
        updated_at: "2024-06-18T15:58:10.981199+05:30",
      },
      {
        product_image_id: 2,
        product: 1,
        product_name: "Glided Plume Metal Wall Art",
        image: "/media/product_images/Glided%20Plume%20Metal%20Wall%20Art/metalwall11.webp",
        alt_text: null,
        created_at: "2024-06-18T15:58:10.988638+05:30",
        updated_at: "2024-06-18T15:58:10.988638+05:30",
      },
    ],
    comments: [],
    created_at: "2024-06-18T15:58:10.966381+05:30",
    updated_at: "2024-07-22T12:12:55.092995+05:30",
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div> // Simple loading message
      ) : isError ? (
        <div>Couldn't fetch the post detail</div> // Simple error message
      ) : (
        <section className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-lg p-5">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl text-gray-700">Edit Post</h1>
              <Link
                to="/admin/products/manage"
                className="px-4 py-2 text-gray-100 bg-gray-800 rounded-md"
              >
                All Posts
              </Link>
            </div>

            {/* Image Upload Section */}
                       <div className="my-4">
          <h5 className="text-lg leading-tight">Manage Images</h5>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
            {product?.images.map((image) => (
              <div key={image.product_image_id} className="relative">
                <img
                  src={`${import.meta.env.VITE_APP_URL}${image.image}`} // Construct full image URL
                  alt={`Product image for ${image.product_name}`}
                  className="w-24 h-auto object-cover rounded-md"
                />
                <button
                  onClick={() => handleImageDelete(image.product_image_id)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full p-1"
                  // disabled={isDeletingImage} // Disable button while deleting
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {/* File Input for New Image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-4"
          />
          <button
            onClick={handleImageUpload}
            // disabled={!newImage || isUploadingImage} // Disable button if no file or during upload
            className="w-fit mt-3 bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Upload New Image
          </button>
        </div>
            {/* Product Information Section */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Product Name</h2>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Price</h2>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
               <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Discount Price</h2>
                <input
                  type="text"
                  value={discountedPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
               
            </div>

            {/* Category Selection Section */}
<div className="mt-5">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">Categories</h2>
  <CreatableSelect
    isMulti
    value={categories}
    onChange={(newValue) => setCategories(newValue.map((item) => ({ value: item.value, label: item.label })))}
    options={product.categories.map((category) => ({ value: category.category_id, label: category.name }))}
    placeholder="Select or create categories"
  />
</div>

            {/* Tags Input Section */}
<div className="mt-5">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">Tags</h2>
  <CreatableSelect
    isMulti
    value={tags}
    onChange={(newValue) => setTags(newValue.map((item) => ({ value: item.value, label: item.label })))}
    options={product.sale_types.map((tag) => ({ value: tag.sale_type_id, label: tag.name }))}
    placeholder="Select or create tags"
  />
</div>


            {/* Description Textarea Section */}
            <div className="mt-5">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Description</h2>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 h-48"
              ></textarea>
            </div>

            {/* Update Post Button */}
            <div className="mt-5 flex justify-end">
              <button
                // onClick={handleUpdatePost}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                disabled={isLoadingUpdatePostDetail}
              >
                {isLoadingUpdatePostDetail ? "Updating..." : "Update Post"}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EditPost;
