import { Controller } from "react-hook-form";
import Dropzone from "react-dropzone";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { Loading } from "react-admin";
import { useState } from "react";

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

const SubcategoryForm = ({ 
  loading,
  subcategory_id, 
  subcategory_image_id,
  index, 
  control, 
  register, 
  getValues,
  setValue,
  errors, 
  handleDeleteSubcategory, 
  handleUpdateSubcategory, 
  handleRemoveSubcategory, 
  previews, 
  setPreviews, 
  watch,
  isEditingSubcategory, 
  isManagingCategory, 
  handleImageUpload ,
  handleDeleteImage,
  files,
  setFiles,
  handleConfirmDelete,
  handleDeleteClick
}) => {


  const currentPreviews = watch(`subcategories.${index}.previews`);

  const currentFiles = watch(`subcategories.${index}.images`)
  
  
 
  
  return (
    <div className="mb-4 md:m-4 border p-4 bg-white rounded-lg space-y-4">
      {!isEditingSubcategory &&  
        <button className="flex w-full content-end justify-end text-4xl text-red-600" type="button" onClick={() => handleRemoveSubcategory(index)}>
          &times;
        </button>
      }

      {/* Name Field */}
      <div className='gap-y-2'>
        <label className="font-medium mr-3">
          Name: <span className="text-red-500 text-2xl font-bold ml-1">*</span>
        </label>
        <input
          type="text"
          {...register(`subcategories.${index}.name`, { required: 'Name is required' })}
          className="d-input d-input-bordered max-w-36 md:max-w-full border-slate-300 text-md font-medium"
          placeholder="Enter Subcategory Name"
        />
        {errors?.subcategories?.[index]?.name && (
          <p className="text-red-500">{errors.subcategories[index].name.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div className='gap-y-2'>
        <label className="font-medium mr-3">
          Description: 
        </label>
        <textarea
          {...register(`subcategories.${index}.description`)}
          className="d-input d-input-bordered border-slate-300 text-md font-medium"
          placeholder="Enter Subcategory Description"
        />
        {errors?.subcategories?.[index]?.description && (
          <p className="text-red-500">{errors.subcategories[index].description.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className='gap-y-2'>
        <label className="font-medium mr-3">
          Image: <span className="text-red-500 text-2xl font-bold ml-1">*</span>
        </label>
        <Controller
          control={control}
          name={`subcategories.${index}.previews`}
          render={({ field: { onChange, onBlur, value } }) => (
           <Dropzone
  onDrop={(acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 10 * 1024 * 1024; // 10MB
      console.log(file)
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Only JPEG, PNG, and WEBP images are allowed.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size exceeds 10MB. Please upload a smaller image.");
        return;
      }

      // Generate preview URL
      const previewUrl = URL.createObjectURL(file);

      // Get existing previews
      // const currentPreviews = getValues(`subcategories.${index}.previews`) || [];

      // Update previews in form state
      setValue(`subcategories.${index}.previews`, [previewUrl]);
      
      // Optionally, update images array if needed

      if(currentFiles.length > 0){
        setValue(`subcategories.${index}.images`, [file]);
      } else 
      setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = file; // Assign file to correct index
      return updatedFiles;
    });
           

    }
  }}
  accept="image/jpeg, image/png, image/webp"
>

              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({
                    className: `dropzone grid content-center h-32 w-fit my-3 rounded-xl ${
                      previews[index] ? "bg-white" : "bg-black/20"
                    }`,
                  })}
                >
                  <input {...getInputProps()} onBlur={onBlur} />
                  {currentPreviews && currentPreviews.length > 0 ? (
                    <img
                      name={`subcategories.${index}.previews[0]`}
                      src={currentPreviews[0]}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-auto content-center mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="p-3 text-center text-black font-medium">
                      <BsFillArrowUpCircleFill className="mx-auto text-2xl mb-2" />
                      Drag & drop or click to upload
                      <em className="block text-sm">(*.jpeg, *.png, *.webp)</em>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            
          )}
          
        />
        

        {/* Update and Delete Buttons (Visible Only When Image Exists)
{previews[index] && (
  <div className="flex gap-2">
    {(isEditingSubcategory || isManagingCategory) && (
      <div className="flex gap-2">
        <UpdateButton 
          type="button" 
          onClick={() => handleImageUpload(subcategory_id,files[index],setPreviews, index)}
        >
          {loading.updating ? <ClipLoader size={20}/> : 'Update'}
        </UpdateButton>

        <DeleteButton 
          type="button" 
          onClick={() => handleDeleteSubcategory(subcategory_id)}
        >
          {loading.deleting ? <ClipLoader size={20}/> : 'Delete'}
        </DeleteButton>
      </div>
    )}
  </div>
)} */}
 
 
{(isEditingSubcategory || isManagingCategory) && currentFiles.length > 0 ? (
  <div className="flex gap-x-2">
    <button
    type="button"
    onClick={() => handleImageUpload(subcategory_id,subcategory_image_id, currentFiles[0],setPreviews,index,true)}
    className="bg-blue-400 text-white px-3 rounded-md"
  >
    {loading.uploadingImage ? <ClipLoader size={20}/> : "Update"}
  </button>
  <button
    type="button"
    onClick={() => handleDeleteImage(subcategory_image_id,index)}
    className="bg-red-400 text-white px-3 rounded-md"
  >
    {loading.deletingImage ? <ClipLoader size={20}/> : "Delete"}
  </button>
  </div>
 
) : files.length >0 && (isManagingCategory || isEditingSubcategory) && (
  <button
    type="button"
    onClick={() => handleImageUpload(subcategory_id,subcategory_image_id,files[index],setPreviews,index,false)}
    className="bg-green-500 text-white px-3 py-1 rounded-md"
  >
     {loading.addingImage ? <ClipLoader size={20}/> : "Add"}
  </button>
)}

        {errors?.subcategories?.[index]?.images && (
          <p className="text-red-500">{errors.subcategories[index].images.message}</p>
        )}
      </div>

      {/* Visible Switch */}
      <div className="flex items-center gap-y-2">
        <label htmlFor={`visible-${index}`}>Visible</label>
        <input
          type="checkbox"
          {...register(`subcategories.${index}.visible`)}
          className="w-4 h-4 accent-green-200"
        />
      </div>

      {/* Update and Delete Buttons */}
      <div className="flex gap-2">
        {(isEditingSubcategory || isManagingCategory) && (
          <div className="flex gap-2">
            <UpdateButton 
              type="button" 
              onClick={() => handleUpdateSubcategory(subcategory_id, index)}
            >
              {loading.updating ? <ClipLoader size={20}/> : 'Update'}
            </UpdateButton>

            <DeleteButton 
              type="button" 
              onClick={()=>handleDeleteClick(subcategory_id)}
            >
              {loading.deleting ? <ClipLoader size={20}/> : 'Delete'}
            </DeleteButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryForm;
