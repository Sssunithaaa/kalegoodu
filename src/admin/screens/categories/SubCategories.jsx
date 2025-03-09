import { useForm, useFieldArray, Controller, set } from "react-hook-form";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { toast, ToastContainer } from "react-toastify";
import SubcategoryForm from "./SubCategoryForm";
import BackButton from "../../BackButton";
import Button from "../../../components/Button";
import { getAllCategories, getSubcategoriesByCategory, getSubcategoriesById } from "../../../services/index/postCategories";
import { ClipLoader } from "react-spinners";
import FullPageLoader from "../../../components/FullPageLoader";
import api from "../../../services/index/api";
import DeleteConfirmationDialog from "../../ConfirmationDialog";
import { deleteItem } from "../../hooks/utils";
// import { addImage } from "../../api/ImageApi";

const SubCategoryPage = () => {
  const { id, subcategoryId } = useParams();
  const isEditingSubcategory = Boolean(subcategoryId);  // True if editing a subcategory
  const isManagingCategory = Boolean(id) && !isEditingSubcategory;  // True if managing subcategories by category
  const [keyword,setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("created_at-desc");
  const baseUrl = import.meta.env.VITE_APP_URL;
  const cloudUrl = import.meta.env.VITE_CLOUD_URL;
  const [files,setFiles] = useState([])

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subcategories: [{id:"", name: "", description: "", images: [],previews:[], visible: false,header:false,category_page:false }],
      categories: [],
    },
  });
   

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategories",
  });

  const [previews, setPreviews] = useState([]);
  const { data = { categories: [] }, isLoading } = useQuery({
    queryKey: ["categories",keyword,sortOption],
    queryFn: () => getAllCategories(keyword,sortOption),
    keepPreviousData: true,
  });
  

 
    
 
 
  // Fetch subcategories by category ID
const { data: categoryData, isLoading: categoryIsLoading,isFetching: categoryIsFetching,refetch:categoryDataRefetch } = useQuery({
  queryKey: ["sub-categories", id],
  queryFn: () => getSubcategoriesByCategory({ id }),
  enabled: isManagingCategory,  // Only fetch when managing by category
});



  
// Fetch single subcategory by subcategory ID
const { data: subcategoryData, isLoading: subcategoryIsLoading,isFetching: subcategoryIsFetching,refetch: subcategoryRefetch } = useQuery({
  queryKey: ["sub-category", subcategoryId],
  queryFn: () => getSubcategoriesById({ subcategoryId }),
  enabled: isEditingSubcategory,  // Only fetch when editing a specific subcategory
});



  useEffect(() => {
  if (isEditingSubcategory && subcategoryData) {
    // Match category IDs with the categories list
    const matchedCategories = data?.categories?.filter(cat => subcategoryData.category.includes(cat.category_id))
      .map(cat => ({ value: cat.category_id, label: cat.name }));

    
    setValue("categories", matchedCategories);

    setValue("subcategories", [{
      id: subcategoryData.subcategory_id,
      subcategory_id: subcategoryData.subcategory_id,
      name: subcategoryData.name,
      description: subcategoryData.description,
      images: subcategoryData.images || [],
      previews : subcategoryData.images.map((img)=>cloudUrl + img?.image) || [null],
      visible: subcategoryData.visible,
      category_page: subcategoryData.category_page,
      header: subcategoryData.header,
    }]);
   
  } else if (isManagingCategory && categoryData) {
    // Use correct category list when managing
    
    const selectedCategories = data?.categories?.filter(cat => cat.category_id === Number(id));
   
    setValue("categories", selectedCategories.map(cat => ({
      value: cat.category_id,
      label: cat.name
    })));

    setValue("subcategories", categoryData.map(sub => ({
      id: sub.subcategory_id,
      subcategory_id: sub.subcategory_id,
      name: sub.name,
      description: sub.description,
      images: sub.images || [],
      previews : sub?.images?.map((img)=>cloudUrl + img?.image) || [null],
      visible: sub.visible,
      header: sub.header,
      category_page: sub.category_page
    })));
  } else {
    // const categoriess = data?.categories?.map(cat => ({ value: cat.category_id, label: cat.name }));
    // setValue("categories", categoriess);
  }
}, [subcategoryData, categoryData, isEditingSubcategory, isManagingCategory, setValue, data.categories, id]);

  const navigate = useNavigate()
   
  const [loading, setLoading] = useState({
  adding: false,
  updating: false,
  deleting: false,
  uploadingImage: false,
  addImage: false,
  deletingImage: false,
});

  const onSubmit = async (data) => {    
    try {
      const selectedCategoryIds = data.categories.map((cat) => cat.value);
     for (const [index, sub] of data.subcategories.entries()) {
        console.log(data.subcategories)
        const formData = new FormData();
        formData.append("name", sub.name);
        formData.append("description", sub.description);
        formData.append("visible", sub.visible);
        formData.append("categories", JSON.stringify(selectedCategoryIds));

        if (sub.images.length > 0 && sub.images[0] instanceof File) {
          formData.append("images", sub.images[0]);
        } else if(!isManagingCategory && !isEditingSubcategory && files[index]){
          formData.append("images",files[index])
        }

        for(let [key,value] of formData.entries()){
          console.log(key,value)
        }

        let response;
        if (isManagingCategory || isEditingSubcategory) {
          console.log(sub)
           if(sub.subcategory_id){
            setLoading(prev => ({ ...prev, updating: true }));
          response = await api.put(`/api/update_subcategory/${sub.subcategory_id}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
           } else {
            setLoading(prev => ({ ...prev, adding: true }));
          response = await api.post(`/api/add_subcategory/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
           }
        } else {
           setLoading(prev => ({ ...prev, adding: true }));
          response = await api.post(`/api/add_subcategory/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }

       

      }

      toast.success((isEditingSubcategory || isManagingCategory) ? "Subcategories updated successfully!" : "Subcategories added successfully!", {
        position: "top-right",
      });

      setTimeout(() => {
        navigate("/admin/sub-categories/manage");
      }, 2000);

    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = error.response?.data?.error || "Error submitting subcategories. Please try again.";
      toast.error(errorMessage, { position: "top-right" });
    } finally {
       setLoading(prev => ({ ...prev, updating: false,adding: false }));
    }
  };
  const [deleteDialogOpen,setDeleteDialogOpen] = useState(false);
  const [deleteId,setDeleteId] = useState(null)
 const handleDeleteClick = (subcategory_id) => {
  setDeleteId(subcategory_id)
    setDeleteDialogOpen(true);
};

   
   const handleConfirmDelete = async () => {
    const deleteUrl = `/api/subcategory/${deleteId}/delete/`;
    await deleteItem(deleteUrl, isManagingCategory ? categoryDataRefetch : subcategoryRefetch);
    setDeleteDialogOpen(false);
};

  
  const handleDeleteSubcategory = async (id) => {
     setLoading(prev => ({ ...prev, deleting: true }));
    try {
      await api.delete(`/api/subcategory/${id}/delete`);
      toast.success("Subcategory deleted successfully!", { position: "top-right" });
      if(isEditingSubcategory){
        subcategoryRefetch()
      } else {
        categoryDataRefetch()
      }
    } catch (error) { 
      console.error("Error deleting subcategory:", error);
      const errorMessage = error.response?.data?.error || "Error deleting subcategory. Please try again.";
      toast.error(errorMessage, { position: "top-right" });
    } finally{
       setLoading(prev => ({ ...prev, deleting: false }));
    }
  }



  const handleUpdateSubcategory = async (subcategory_id,index) => {
  const updatedData = getValues(`subcategories[0]`);


   setLoading(prev => ({ ...prev, updating: true }));
  try {
    const formData = new FormData();
    formData.append("name", updatedData.name);
    formData.append("description", updatedData.description);
    formData.append("visible", updatedData.visible);
    formData.append("header", updatedData.header);
    formData.append("category_page", updatedData.category_page);
    let selectedCategoryIds = [];

    if (isManagingCategory) {
      selectedCategoryIds = [Number(id)]; // Only include id
    } else if (isEditingSubcategory) {
      selectedCategoryIds = data?.categories
      ?.filter(cat => subcategoryData?.category?.includes(cat.category_id))
      .map(cat => cat.category_id);
    }

    formData.append("categories", JSON.stringify(selectedCategoryIds));
    if (updatedData.images instanceof File) {
      formData.append("images", updatedData.images); 
    }

    

    await api.put(`/api/update_subcategory/${subcategory_id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Subcategory updated successfully!", { position: "top-right" });

    if (isEditingSubcategory) {
      subcategoryRefetch(); 
    } else if(isManagingCategory){
      categoryDataRefetch();
    }
  } catch (error) {
    console.error("Error updating subcategory:", error);
    const errorMessage = error.response?.data?.error || "Error updating subcategory. Please try again.";
    toast.error(errorMessage, { position: "top-right" });
  } finally {
     setLoading(prev => ({ ...prev, updating: false }));
  }
};



  const handleImageUpload = async (subcategoryId,subcategoryImageId, file, setPreviews, index,editing) => {

  if (!file) {
    toast.error("Please select an image.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("alt_text", `Image for subcategory ${subcategoryId}`);

  try {
   
    let response;
   if(editing){
    setLoading(prev => ({ ...prev, uploadingImage: true }));
     response = await api.put(`/api/update_subcategory_image/${subcategoryImageId}/`,formData);
   } else {
    setLoading(prev => ({ ...prev, addingImage: true }));
     response = await api.post(`/api/add_subcategory_image/${subcategoryId}/`,formData);
     console.log(response)
   }

   
    const previewUrl = URL.createObjectURL(file);
    setPreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews[index] = previewUrl;
      return updatedPreviews;
    });

    toast.success("Image uploaded successfully!");
    subcategoryRefetch()
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(prev => ({ ...prev, uploadingImage: false }));
    setLoading(prev => ({...prev,addingImage: false}))
  }
};


    

  const handleDeleteImage = async (subcategory_image_id, index) => {
  setLoading(prev => ({ ...prev, deletingImage: true }));

  try {
    await api.delete(`/api/subcategory_image/${subcategory_image_id}/delete`);

    // Remove image from preview
    setPreviews(prev => {
      const updatedPreviews = [...prev];
      updatedPreviews[index] = null;
      return updatedPreviews;
    });

    toast.success("Image deleted successfully!");
    subcategoryRefetch()
  } catch (error) {
    toast.error("Failed to delete image.");
  } finally {
    setLoading(prev => ({ ...prev, deletingImage: false }));
  }
};


  if(categoryIsLoading || subcategoryIsLoading) return <FullPageLoader/>

  return (
    <div className="container mx-auto md:text-lg">
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={()=>setDeleteDialogOpen(false)} onConfirm={handleConfirmDelete}/>
      <ToastContainer />
      <div className="flex w-full justify-start">
        <BackButton />
      </div>

      <h4 className="text-lg leading-tight my-4">
        {isEditingSubcategory ? "Update Sub-Categories" : "Add New Sub Categories"}
      </h4>

      <div className="my-2">
  <label>Categories</label>
  <Controller
  name="categories"
  control={control}
  render={({ field }) => (
    <CreatableSelect
      isMulti
      options={data?.categories?.map((cat) => ({
        value: cat.category_id,
        label: cat.name,
      }))}
      value={field.value} // ✅ Ensures selected categories stay editable
      onChange={(selectedOptions) => {
        field.onChange(selectedOptions);
      }}
      onBlur={field.onBlur}
      isDisabled={isManagingCategory} // ✅ Only disable when managing categories, not when editing subcategories
    />
  )}
/>

  {errors.categories && <p className="text-red-500">{errors.categories.message}</p>}
</div>


      {(!isEditingSubcategory) && (
        <Button type="button" className="mt-4" onClick={() => append({ name: "", description: "", images: [], visible: false })}>
        + Add Subcategory
      </Button>
      )}

      <div className="w-full flex flex-wrap items-stretch gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-wrap gap-4">
         
            {fields.map((item, index) => (
        
              <div key={item.id}>
                <SubcategoryForm
                    id={item.id}
  subcategory_id={item.subcategory_id}
  subcategory_image_id={item.images?.[0]?.subcategory_image_id}
  index={index}
  getValues={getValues}
  control={control}
  register={register}
  setValue={setValue}
  errors={errors}
  watch={watch}
  handleRemoveSubcategory={remove}
  previews={previews}
  setPreviews={setPreviews}
  isEditingSubcategory={isEditingSubcategory}
  isManagingCategory={isManagingCategory}
  handleDeleteSubcategory={handleDeleteSubcategory}
  handleUpdateSubcategory={(subcategory_id) => handleUpdateSubcategory(subcategory_id, fields[index])} 
  loading={loading}
  handleImageUpload={handleImageUpload}
  handleDeleteImage={handleDeleteImage}
  files={files}
  setFiles={setFiles}
  handleConfirmDelete={() => handleConfirmDelete(item.subcategory_id)}
  handleDeleteClick={handleDeleteClick}

/>

              </div>
            ))}
          </div>

          <Button type="submit" className="px-4">
            {isEditingSubcategory || isManagingCategory ? loading.updating ? <ClipLoader size={20}/> :  "Update" : loading.adding ? <ClipLoader size={20}/> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryPage;
