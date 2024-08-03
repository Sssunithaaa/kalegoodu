import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import {
  getSingleCategory,
  updateCategory,
} from "../../../services/index/postCategories";

const EditCategories = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { slug } = useParams();
  // const userState = useSelector((state) => state.user);

  // State for all fields
  const [categoryTitle, setCategoryTitle] = useState("Sample Category Title");
  const [description, setDescription] = useState("Sample Description");
  const [createdAt, setCreatedAt] = useState("2024-06-18T15:50:36.589403+05:30");
  const [status, setStatus] = useState("Active");
  const [visibility, setVisibility] = useState(true);

  // Fetching single category (You can modify this to use actual data)
  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    onSuccess: (data) => {
      setCategoryTitle(data?.title || "Sample Category Title");
      setDescription(data?.description || "Sample Description");
      setCreatedAt(data?.created_at || "2024-06-18T15:50:36.589403+05:30");
      setStatus(data?.status || "Active");
      setVisibility(data?.visibility || true);
    },
    refetchOnWindowFocus: false,
  });

  const images = [
     "/media/category_images/Canvas%20Paintings/canvas1.webp","/media/category_images/Canvas%20Paintings/canvas2.webp","/media/category_images/Canvas%20Paintings/canvas3.webp"
  ]
  // Mutation for updating category
  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: ({ title, slug, description, status, visibility, token }) => {
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
        toast.success("Category is updated");
        navigate(`/admin/categories/manage/edit/${data._id}`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  // Handle Update Category Function
  const handleUpdateCategory = () => {
    if (!categoryTitle || !description) return;
    mutateUpdateCategory({
      title: categoryTitle,
      slug,
      description,
      status,
      visibility,
      // token: userState.userInfo.token,
    });
  };

  return (
    <div className="col-span-4 py-8">
      <h4 className="text-lg leading-tight">Update Category</h4>
      <div className="d-form-control w-full mt-6">
                        <div className="mt-2">
          <h5 className="text-lg leading-tight">Manage Images</h5>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
            {images.map((image) => (
              <div key={image.imageId} className="relative">
                <img
                  src={`${import.meta.env.VITE_APP_URL}${image}`} // Construct full image URL
                  alt={`Category image for ${categoryTitle}`}
                  className="w-24 h-auto object-cover rounded-md"
                />
                <button
                  onClick={() => handleImageDelete(image.imageId)}
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
            // onChange={handleImageChange}
            className="mt-4"
          />
          <button
            // onClick={handleImageUpload}
            // disabled={!newImage || isUploadingImage} // Disable button if no file or during upload
            className="w-fit mt-3 bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Upload New Image
          </button>
        </div>
          <div className="flex flex-col mt-4 gap-y-2">
          <label>Category title: </label>
        <input
          value={categoryTitle}
          className="d-input d-input-bordered  border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder="Category Title"
        />
        </div>

        <div className="flex flex-col mt-4 gap-y-2">
           <label>Description: </label>
        <textarea
          value={description}
 className="d-input d-input-bordered  border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        </div>
       

        {/* Created At Field (Display Only, Non-editable) */}
        <div className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-emerald-600 font-medium font-roboto text-dark-hard mt-4">
          Created At: {new Date(createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>

        {/* Status Field (Dropdown Selection) */}
        <div>
          <select
          value={status}
          className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard mt-4"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        </div>

        {/* Visibility Field (Checkbox) */}
        <label className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={visibility}
            onChange={(e) => setVisibility(e.target.checked)}
            className="mr-2"
          />
          Visibility
        </label>

        {/* Update Button */}
        <button
          disabled={isLoadingUpdateCategory || isLoading || isError}
          type="button"
          onClick={handleUpdateCategory}
          className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Update Category
        </button>
      </div>
    </div>
  );
};

export default EditCategories;
