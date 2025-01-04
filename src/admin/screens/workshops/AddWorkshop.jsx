import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import styled from "styled-components";
import 'react-quill/dist/quill.snow.css'; 
import ReactQuill from 'react-quill';
import { createWorkshop, getSingleWorkshop, updateWorkshop } from "../../../services/index/workshops";
import Button from "../../../components/Button";
import BackButton from "../../BackButton";
import axios from "axios";
import { addImage,updateImage } from "../../api/ImageApi";
import { ClipLoader } from "react-spinners";
const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding-inline: 10px;
  padding-block: 5px;
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
const AddWorkshop = () => {
  const queryClient = useQueryClient();
  const { slug } = useParams();
  const isEditMode = Boolean(slug);
  
  const [title, setTitle] = useState(isEditMode ? "" : "");
  const [description, setDescription] = useState(isEditMode ? "" : "");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // New field for workshop date
  const [place, setPlace] = useState(""); // New field for workshop place
  const [videoUrl, setVideoUrl] = useState(""); // New field for video URL
  const [videoId, setVideoId] = useState(null); // New field for video URL
  const [files, setFiles] = useState([null, null, null]);
  const [previews, setPreviews] = useState([null, null, null]);

  
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getSingleWorkshop({ slug }),
    queryKey: ["workshops", slug],
    
    enabled: isEditMode,
  });
    const [isAdding,setIsAdding] = useState(false)

  useEffect(()=>{

      if(isEditMode){
         setTitle(data?.name || "");
        setPlace(data?.place);
       setDate(data?.date || date);
       setVideoUrl(data?.videos?.[0]?.video_url)
      setDescription(data?.description || "");
      setVideoId(data?.videos?.[0]?.workshopvideo_id)
      setPreviews(data?.images?.map((image) => import.meta.env.VITE_CLOUD_URL+ image?.image) || [null, null, null]);
      }
  },[data,isAdding])

  const baseUrl = import.meta.env.VITE_APP_URL;

  const handleFileChange = (acceptedFiles, index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = acceptedFiles[0];
    setFiles(updatedFiles);

    const updatedPreviews = [...previews];
    updatedPreviews[index] = URL.createObjectURL(acceptedFiles[0]);
    setPreviews(updatedPreviews);
  };

 
  const { mutate: mutateAddWorkshop, isLoading: isLoadingAddWorkshop } = useMutation({
    mutationFn: (formData) => createWorkshop(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["workshops"]);
      toast.success("Workshop added successfully!");
      
  
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split('T')[0]);
    setPlace("");
    setVideoUrl("");
    setFiles([null, null, null]);
    setPreviews([null, null, null]);

    },
    onError: (error) => {
        // console.log(error)
      toast.error("Couldn't add workshop!!");
    },
  });
   const { mutate: mutateUpdateWorkshop, isLoading: isLoadingUpdateWorkshop } = useMutation({
    mutationFn: ({formData,slug}) => updateWorkshop({formData,slug}),
    onSuccess: () => {
      queryClient.invalidateQueries(["workshops"]);
      toast.success("Workshop update successfully!");
    },
    onError: (error) => {
        // console.log(error)
      toast.error("Couldn't update workshop!!");
    },
  });
  
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);

  const handleUpdate = async (workshopImageId, file) => {
    console.log(workshopImageId)
    await updateImage(baseUrl, workshopImageId, file, refetch, setIsUpdatingImage,`update_workshop_image/${workshopImageId}/`);
    
  };
 
  const [isAddingImage,setIsAddingImage] = useState(false)

 const handleAddImage = (workshopId, file) => {
    addImage(baseUrl, workshopId, file, refetch, setIsAddingImage,`workshops/${workshopId}/add-images/`);
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsAdding(true)
  try {
    // Step 1: Add or Update Workshop Details
    const workshopFormData = new FormData();
    workshopFormData.append("name", title);
    workshopFormData.append("description", description);
    workshopFormData.append("date", date);
    workshopFormData.append("place", place);
    workshopFormData.append("completed",true)

    if(videoUrl){
       const videoFormData = new FormData();
      videoFormData.append("video_url", videoUrl);
      
      workshopFormData.append("video_url",videoUrl);
      if(isEditMode){
         try {
        await axios.put(`${baseUrl}/api/update_workshop_video/${slug}/`, videoFormData, {
       headers: { "Content-Type": "multipart/form-data" },
       });
      } catch (error) {
        console.log(error)
      }
      }
    }
    if(!isEditMode){
      files.forEach((file, index) => {
      if (file) {
        workshopFormData.append(`images`, file); // 'images' corresponds to `request.FILES.getlist('images')` in backend
      }
    });
    }
   
    isEditMode
      ? await updateWorkshop({ formData: workshopFormData, slug })
      : await createWorkshop(workshopFormData);
   
    toast.success(isEditMode ? "Workshop updated successfully!" : "Workshop added successfully!");
    queryClient.invalidateQueries(["workshops"]);

    // Clear Form Fields
    if(!isEditMode){
      setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setPlace("");
    setVideoUrl("");
    setFiles([null, null, null]);
    setPreviews([null, null, null]);
    } else {
      refetch()
    }
    setIsAdding(false)

  } catch (error) {
    console.error(error);
    setIsAdding(false)
    toast.error("An error occurred while submitting the workshop!");
  }
};
 useEffect(()=>{
   if(!isEditMode){
      setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setPlace("");
    setVideoUrl("");
    setFiles([null, null, null]);
    setPreviews([null, null, null]);
    } 
 },[isEditMode])

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`${baseUrl}/api/workshop-images/${imageId}/delete/`);
      toast.success("Image deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete image");
      console.error("Error deleting image:", error.message);
    }
  };

  return (
    <div className="col-span-4 pb-4">
      <div className="flex ml-4 w-full justify-start self-start">
    <BackButton />
  </div>
      <h4 className="text-lg leading-tight mt-4">
        {isEditMode ? "Update Workshop" : "Add New Workshop"}
      </h4>
      <form onSubmit={handleSubmit} className="d-form-control w-full mt-4">
        <div className="flex md:col-span-2 flex-col gap-2">
          <label className="mb-2">Workshop Images:</label>
          <div className="flex md:flex-row flex-col">
            {[0, 1, 2].map((index) => (
              <div key={index} className="mx-auto w-[100%] content-center p-2 rounded-md">
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileChange(acceptedFiles, index)}
                  accept="image/*"
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps({
                        className: `${
                          previews[index] ? "bg-white" : "bg-black/20"
                        } dropzone grid content-center h-full mx-auto lg:w-[80%] rounded-xl`,
                      })}
                    >
                      <input {...getInputProps()} />
                      {previews[index] ? (
                        <img
                          src={previews[index]}
                          alt={`Preview ${index + 1}`}
                          className="w-[90%] h-auto rounded-lg content-center mx-auto"
                        />
                      ) : (
                        <div className="p-3">
                          <BsFillArrowUpCircleFill
                            style={{ fontSize: "20px", marginBottom: "10px", color: "black" }}
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
                <div className="flex flex-row gap-x-2">
  {data?.images?.[index] && files[index] ? (
    <UpdateButton
      className="disabled:cursor-not-allowed"
      disabled={isUpdatingImage}
      type="button"
      onClick={() => handleUpdate(data?.images[index]?.workshopimage_id, files[index])}
    >
      {isUpdatingImage ? <ClipLoader size={20} /> : "Update"}
    </UpdateButton>
  ) : (
    files[index] && (
      <UpdateButton
        className="disabled:cursor-not-allowed"
        disabled={isAddingImage}
        type="button"
        onClick={() => handleAddImage(data?.workshop_id, files[index])}
      >
        {isAddingImage ? <ClipLoader size={20} /> : "Add Image"}
      </UpdateButton>
    )
  )}
  
  {/* Delete button always visible */}
  <DeleteButton
    type="button"
    onClick={() => handleDelete(data?.images?.[index]?.workshopimage_id)}
  >
    Delete
  </DeleteButton>
</div>

              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-6 gap-y-2">
          <label>Title: </label>
          <input
            value={title}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>

        <div className="flex flex-col mt-4 gap-y-2">
          <label>Description: </label>
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

        <div className="flex flex-col mt-4 gap-y-2">
          <label>Date: </label>
          <input
            type="date"
            value={date}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-4 gap-y-2">
          <label>Place: </label>
          <input
            value={place}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Place"
          />
        </div>

        <div className="flex flex-col mt-4 gap-y-2">
          <label>Video URL (optional): </label>
          <input
            value={videoUrl}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Video URL"
          />
        </div>

        <div className="mt-6 w-[30%] flex mx-auto">
          <Button
            type="submit"
            className="disabled:cursor-none d-button d-button-primary !outline-slate-300 border-2 border-gray-300 w-full py-2"
            disabled={isLoadingAddWorkshop || isAdding}
          >
            {isLoadingAddWorkshop|| isAdding || isLoadingUpdateWorkshop ? "Submitting..." : isEditMode ? "Update workshop" : "Add workshop"}
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddWorkshop;
