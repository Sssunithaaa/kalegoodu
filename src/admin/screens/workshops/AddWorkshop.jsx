import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import styled from "styled-components";
import { createWorkshop, getSingleWorkshop, updateWorkshop } from "../../../services/index/workshops";
import Button from "../../../components/Button";
import BackButton from "../../BackButton";


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

const AddWorkshop = () => {
  const queryClient = useQueryClient();
  const { slug } = useParams();
  const isEditMode = Boolean(slug);
  
  // State for category/workshop details
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
  useEffect(()=>{
 setTitle(data?.name || "");
      setPlace(data?.place);
       setDate(data?.date || date);
       setVideoUrl(data?.videos?.[0]?.video_url)
      setDescription(data?.description || "");
      setVideoId(data?.videos?.[0]?.workshopvideo_id)
      setPreviews(data?.images?.map((image) => import.meta.env.VITE_CLOUD_URL+ image?.image) || [null, null, null]);
  },[data])
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
    },
    onError: (error) => {
        console.log(error)
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
        console.log(error)
      toast.error("Couldn't update workshop!!");
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("place", place);
  const videos = {
    video_id: videoId,
    video_url: videoUrl
  };
    formData.append("videos", JSON.stringify(videos));

    files.forEach(file => {
      if (file) {
        formData.append("images", file);
      }
    });

    const newImages = files.filter(file => file && file.hasOwnProperty('path'));

    if (newImages.length > 0) {
      newImages.forEach(file => {
        formData.append('new_images', file);
      });
    }

    // Log FormData content to verify
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (isEditMode) {
      // Handle update logic here
      mutateUpdateWorkshop({ formData, slug });
    } else {
      mutateAddWorkshop(formData, {
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
    console.error(error);
    toast.error("Couldn't add workshop!");
  },
});

    }
  };

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`${baseUrl}/api/category_image/${imageId}/delete/`);
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
                {data?.images[index] && (
                  <DeleteButton type="button" onClick={() => handleDelete(data?.images[index]?.category_image_id)}>
                    Delete
                  </DeleteButton>
                )}
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
          <textarea
            value={description}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-md font-medium font-roboto text-dark-hard"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
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
            className="d-button d-button-primary !outline-slate-300 border-2 border-gray-300 w-full py-2"
            disabled={isLoadingAddWorkshop}
          >
            {isLoadingAddWorkshop || isLoadingUpdateWorkshop ? "Submitting..." : isEditMode ? "Update workshop" : "Add workshop"}
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddWorkshop;
