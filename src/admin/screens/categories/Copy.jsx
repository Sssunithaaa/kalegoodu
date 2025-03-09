// import React, { useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import CreatableSelect from 'react-select/creatable';
// import { useParams } from 'react-router-dom';
// import Button from '../../../components/Button';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { getAllCategories } from '../../../services/index/postCategories';
// import Dropzone from 'react-dropzone';
// import { BsFillArrowUpCircleFill } from "react-icons/bs";
// import styled from "styled-components";
// import BackButton from '../../BackButton';
// import { toast } from 'react-toastify';
// const DeleteButton = styled.button`
//   background-color: #e74c3c;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding-inline: 10px;
//   padding-block:5px;
  
//   cursor: pointer;
//   margin-top: 10px;
//   &:hover {
//     background-color: #c0392b;
//   }
// `;
// const UpdateButton = styled.button`
//   background-color: #0096FF;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding-inline: 10px;
//   padding-block:5px;
//   cursor: pointer;
//   margin-top: 10px;
//   &:hover {
//     background-color: #0096FA;
//   }
// `;

// const schema = yup.object().shape({
//   name: yup.string().required('Subcategory name is required'),
//   description: yup.string().required('Description is required'),
//   categories: yup.array()
//     // .of(yup.number().typeError('Invalid category ID'))
//     .min(1, 'At least one category must be selected')
//     .required('Categories are required'),
//   visible: yup.boolean(),
//   header: yup.boolean(),
//   category_page: yup.boolean(),
//   images: yup.array()
//     .of(
//       yup.mixed()
//         .test('fileSize', 'File too large', value => !value || value.size <= 5 * 1024 * 1024) // 5MB limit
//         .test('fileType', 'Unsupported File Format', value => !value || ['image/jpeg', 'image/png'].includes(value.type))
//     )
//     .max(5, 'You can upload up to 5 images'),
//   alt_text: yup.string().optional(),
// });

// const SubCategoryPage = ({ categoriesData }) => {
//     const [keyword,setKeyword] = useState("");
//     const [sortOption, setSortOption] = useState("created_at-desc");
//     const { slug } = useParams();
//     const isEditMode = Boolean(slug);
//     const { data = { categories: [] }, isLoading, isFetching, refetch } = useQuery({
//         queryKey: ['categories', keyword, sortOption],
//         queryFn: () => getAllCategories(keyword, sortOption), // Pass the search and sort options
//         keepPreviousData: true,
//         refetchOnWindowFocus: false
//     });

//    const { register, handleSubmit,control, formState: { errors } } = useForm({
//   resolver: yupResolver(schema),
// });


//   console.log(errors)

//     const [subcategories, setSubcategories] = useState([{ subcategory: '', image: null }]);


//     const {mutate: mutateAddSubCategory} = useMutation({
//     mutationFn: (formData) => axios.post('/api/add_subcategory/', formData),
//     onSuccess: () => {
//         toast.success("Subcategory added successfully");
//         refetch();
//     },
//     onError: (error) => {
//         console.log(error);
//         toast.error(`Error: ${error.response?.data?.message || error.message}`);
//     }
// });

//     const handleAddSubcategory = () => {
//     setSubcategories([...subcategories, { subcategory: '', image: null }]);
//     };

//     const handleSubcategoryChange = (index, field, value) => {
//         const updated = [...subcategories];
//         updated[index][field] = value;
//         setSubcategories(updated);
//     };

//     const [files, setFiles] = useState([null, null, null]);
//     const [previews, setPreviews] = useState([null, null, null]);
//     const handleFileChange = (acceptedFiles, index) => {
//         const allowedTypes = ["image/jpeg", "image/png","image/webp"];
//         const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  
//         if (acceptedFiles.length > 0) {
//             const file = acceptedFiles[0];
  
//             if (!allowedTypes.includes(file.type)) {
//                 toast.error("Invalid file type. Only JPEG, PNG and WEBP images are allowed.");
//                 return;
//             }
  
//             if (file.size > maxSize) {
//                 toast.error("File size exceeds 10MB. Please upload a smaller image.");
//                 return;
//             }
  
//       const updatedFiles = [...files];
//       updatedFiles[index] = file;
//       setFiles(updatedFiles);
  
//       const updatedPreviews = [...previews];
//       updatedPreviews[index] = URL.createObjectURL(file);
//       setPreviews(updatedPreviews);
//     }
//   };
  
  

//   const onSubmit = (subcategories) => {
//     console.log(subcategories);
//   subcategories.forEach((subcat) => {
//     const formData = new FormData();

//     formData.append('name', subcat.name);
//     formData.append('description', subcat.description);
//     formData.append('visible', subcat.visible);
//     formData.append('header', subcat.header);
//     formData.append('category_page', subcat.category_page);
//     formData.append('categories', JSON.stringify(subcat.categories));

//     if (subcat.images) {
//       subcat.images.forEach((image) => formData.append('images', image));
//     }

//     axios.post('/api/add_subcategory/', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     })
//     .then((response) => console.log('Subcategory added:', response.data))
//     .catch((error) => console.error('Error:', error.response.data));
//   });
// };


  

//   return (
//    <div className='container mx-auto'>
//      <div className="flex w-full justify-start self-start">
//     <BackButton />
//   </div>
//       <h4 className="text-lg leading-tight my-4">
//         {isEditMode ? "Update Sub Categories" : "Add New Sub Categories"}
//       </h4>
//      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       {/* Name */}
//       {/* <div>
//         <label>Name</label>
//         <input {...register('name')} className="input" />
//         {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//       </div>

//       {/* Description */}
//       {/* <div>
//         <label>Description</label>
//         <textarea {...register('description')} className="input" />
//         {errors.description && <p className="text-red-500">{errors.description.message}</p>}
//       </div> */}

//       {/* Categories */}
    //   <div>
    //     <label>Categories</label>
    //     <Controller
    //       name="categories"
    //       control={control}
    //       render={({ field }) => (
    //         <CreatableSelect
    //         isMulti
    //           options={data?.categories?.map((cat) => ({ value: cat.category_id, label: cat.name }))}
    //           {...field}
    //         />
    //       )}
    //     />
    //     {errors.categories && <p className="text-red-500">{errors.categories.message}</p>}
    //   </div>

//       {/* Subcategories with Image Upload */}
//      <div>
//   <label>Subcategories:&nbsp;&nbsp;&nbsp;
//     <span>
//       <button className='px-2 bg-green-200 rounded-md' type="button" onClick={handleAddSubcategory}>+</button>
//     </span>
//   </label>

//   <div className='flex flex-wrap items-stretch'>
//    {subcategories.map((sub, index) => (
//   <div key={index} className="mb-4 m-3 border p-4 rounded-lg space-y-4">
    
//     {/* Name Field */}
//     <div className='gap-y-2'>
//       <label className="font-medium mr-3">
//         Name: <span className="text-red-500 text-2xl font-bold ml-1">*</span>
//       </label>
//       <input
//         type="text"
//         {...register(`subcategories.${index}.name`, { required: 'Name is required' })}
//         className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"
//         placeholder="Enter Subcategory Name"
//       />
//       {errors.subcategories?.[index]?.name && (
//         <p className="text-red-500">{errors.subcategories[index].name.message}</p>
//       )}
//     </div>

//     {/* Description Field */}
//     <div className='gap-y-2'>
//       <label className="font-medium mr-3">
//         Description: <span className="text-red-500 text-2xl font-bold ml-1">*</span>
//       </label>
//       <textarea
//         {...register(`subcategories.${index}.description`, { required: 'Description is required' })}
//         className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"
//         placeholder="Enter Subcategory Description"
//       />
//       {errors.subcategories?.[index]?.description && (
//         <p className="text-red-500">{errors.subcategories[index].description.message}</p>
//       )}
//     </div>

//     {/* Image Upload */}
//     <div className='gap-y-2'>
//       <label className="font-medium mr-3">
//         Image: <span className="text-red-500 text-2xl font-bold ml-1">*</span>
//       </label>
//       <Controller
//         control={control}
//         name={`subcategories.${index}.images`}
//         rules={{ required: 'Image is required' }}
//         render={({ field }) => (
//           <Dropzone
//             onDrop={(acceptedFiles) => field.onChange(acceptedFiles)}
//             accept="image/jpeg, image/png, image/webp"
//           >
//             {({ getRootProps, getInputProps }) => (
//               <div
//                 {...getRootProps({
//                   className: `${previews[index] ? "bg-white" : "bg-black/20"} dropzone grid content-center w-56 h-32 my-3 rounded-xl`,
//                 })}
//               >
//                 <input {...getInputProps()} />
//                 {previews[index] ? (
//                   <img
//                     src={previews[index]}
//                     alt={`Preview ${index + 1}`}
//                     className="h-32 w-auto content-center mx-auto rounded-lg"
//                   />
//                 ) : (
//                   <div className="p-3 text-center text-black font-medium">
//                     <BsFillArrowUpCircleFill className="mx-auto text-2xl mb-2" />
//                     Drag & drop or click to upload
//                     <em className="block text-sm">(*.jpeg, *.png, *.webp)</em>
//                   </div>
//                 )}
//               </div>
//             )}
//           </Dropzone>
//         )}
//       />
//       {errors.subcategories?.[index]?.images && (
//         <p className="text-red-500">{errors.subcategories[index].images.message}</p>
//       )}
//     </div>

//     {/* Visible Switch */}
//     <div className="flex items-center gap-y-2">
//       <label htmlFor={`visible-${index}`}>Visible</label>
//       <input
//         type="checkbox"
//         {...register(`subcategories.${index}.visible`)}
//         defaultChecked={sub.visible}
//         className="w-4 h-4 accent-green-200"
//       />
//     </div>

//     {/* Delete Button */}
//     <div className="flex gap-2">
//       <DeleteButton type="button" onClick={() => handleDeleteSubcategory(index)}>Delete</DeleteButton>
//     </div>
//   </div>
// ))}


//     {/* General Subcategories Error */}
//     {errors.subcategories && <p className="text-red-500">{errors.subcategories.message}</p>}
//   </div>
// </div>



      
//       <Button type="submit">Create Subcategories</Button>
//     </form>
//    </div>
//   );
// };

// export default SubCategoryPage;
