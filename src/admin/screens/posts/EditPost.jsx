import React, { useState,useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify"; 

import { HiOutlineCamera } from "react-icons/hi";
import { getSingleProduct, updateProduct } from "../../../services/index/products"
import { getAllCategories } from "../../../services/index/postCategories"; 
import { categoryToOption, filterCategories } from "../../../utils/multiSelectTagUtils"
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
  // const userState = useSelector((state) => state.user); 
  const [initialPhoto, setInitialPhoto] = useState(null); // Initial post photo
  const [photo, setPhoto] = useState(null); // New photo
  const [categories, setCategories] = useState([]); // Categories state
  const [name, setName] = useState(""); // name state
  const [tags, setTags] = useState([]); // Tags state
  const [postSlug, setPostSlug] = useState(slug); // Slug state
  const [rating, setRating] = useState(""); // rating state
  const [description, setDescription] = useState(""); // description content state

 const samplePostData = {
  name: "Trendy Summer Sneakers for 2024",
  categories: [
    { _id: "1", name: "Footwear" },
    { _id: "2", name: "Sneakers" },
    { _id: "3", name: "Summer Collection" },
  ],
  tags: ["Fashion", "Summer", "Sneakers", "Casual"],
  photo: "sneakers.jpg", // Assume this is located in your public/images folder
  slug: "trendy-summer-sneakers-2024",
  rating: "Step into style with our latest collection of summer sneakers.",
  description: `
    Discover the ultimate summer footwear that combines style and comfort in our Trendy Summer Sneakers for 2024. Crafted with breathable materials and a chic design, these sneakers are perfect for any casual outing. 
    ### Key Features:
    - Lightweight and breathable fabric
    - Available in multiple colors
    - Durable rubber sole for all-day comfort
    - Sizes ranging from 6 to 12
    - Special summer edition limited to 1000 pairs
    ### Product Specifications:
    - **Material:** Mesh fabric with synthetic overlays
    - **Colors:** White, Black, Blue, Red, Green
    - **Sizes:** US 6-12, including half sizes
    - **Price:** $79.99
    ### Customer Reviews:
    > "These sneakers are the most comfortable I have ever worn during the summer!" - **Jessica**
    > "Love the design and the fit is just perfect." - **Michael**
    > "Great value for money and very trendy." - **Emily**
  `,
};

  // Fetching post details with react-query
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleProduct({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      // Populate state with fetched data
      setInitialPhoto(samplePostData?.photo);
      setCategories(samplePostData.categories.map((item) => item._id));
      setName(samplePostData.name);
      setTags(samplePostData.tags);
      setDescription(samplePostData.description);
    },
    refetchOnWindowFocus: false, // Do not refetch on window focus
  });
  // src/constants/samplePostData.js


  // Mutation for updating post details
  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updateProduct({
        updatedData,
        slug,
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

  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  // Handle post update
  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        // stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );

      updatedData.append("postPicture", picture);
    }

    // Append other form data
    updatedData.append(
      "document",
      JSON.stringify({ description, categories, name, tags, slug: postSlug, rating })
    );

    mutateUpdatePostDetail({
      updatedData,
      slug,
      // token: userState.userInfo.token, 
    });
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
    setCategories(samplePostData.categories.map(categoryToOption)); // Use categoryToOption
    setTags(samplePostData.tags.map((tag) => ({ value: tag, label: tag })));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div> // Simple loading message
      ) : isError ? (
        <div>Couldn't fetch the post detail</div> // Simple error message
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {photo ? (
                <img
                  // src={URL.createObjectURL(photo)}
                  alt={samplePostData?.name}
                  className="rounded-xl w-full"
                />
              ) : initialPhoto ? (
                <img
                  // src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={samplePostData?.name}
                  className="rounded-xl w-full"
                />
              ) : (
                <div className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center">
                  <HiOutlineCamera className="w-7 h-auto text-primary" />
                </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5"
            >
              Delete Image
            </button>
            <div className="mt-4 flex gap-2">
              {samplePostData?.categories.map((category) => (
                <Link
                  key={category.id} // Added key for mapping
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="name">
                <span className="d-label-text">Name</span>
              </label>
              <input
                id="name"
                value={name}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the name"
              />
            </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="rating">
                <span className="d-label-text">Rating</span>
              </label>
              <input
                id="rating"
                value={rating}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) => setRating(e.target.value)}
                placeholder="Enter a rating"
              />
            </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="slug">
                <span className="d-label-text">Slug</span>
              </label>
              <input
                id="slug"
                value={postSlug}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) =>
                  setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
                }
                placeholder="Enter the post slug"
              />
            </div>
          <div className="mb-5 mt-2">
        <label className="d-label">
          <span className="d-label-text">Categories</span>
        </label>
        {samplePostData.categories.length > 0 && (
          <Select
            isMulti
            options={samplePostData.categories.map(categoryToOption)} // Ensure correct format
            defaultValue={categories} // Use mapped categories
            onChange={(newValue) => setCategories(newValue.map((item) => item.value))}
            loadOptions={promiseOptions}
            placeholder="Select categories"
          />
        )}
      </div>
            <div className="mb-5 mt-2">
        <label className="d-label">
          <span className="d-label-text">Tags</span>
        </label>
        {samplePostData.tags.length > 0 && (
          <Select
            isMulti
            options={samplePostData.tags.map((tag) => ({
              value: tag,
              label: tag,
            }))} // Correctly map tags for options
            defaultValue={tags} // Use mapped tags
            onChange={(newValue) => setTags(newValue.map((item) => item.value))}
            placeholder="Select or create tags"
          />
        )}
      </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="description">
                <span className="d-label-text">Description</span>
              </label>
              <textarea
                id="description"
                value={description}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter post content"
                rows="10" // Textarea with rows for better UX
              />
            </div>
            <button
              className={`bg-primary text-white font-semibold py-2 px-4 rounded-lg mt-5 ${
                isLoadingUpdatePostDetail ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleUpdatePost}
              disabled={isLoadingUpdatePostDetail}
            >
              {isLoadingUpdatePostDetail ? "Updating..." : "Update Post"}{" "}
              {/* Button state for update */}
            </button>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditPost;
