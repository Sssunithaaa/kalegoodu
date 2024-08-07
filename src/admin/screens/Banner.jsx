import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import Dropzone from "react-dropzone";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import axios from 'axios';
const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const FileInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

const FileInput = styled.input`
  display: block;
  margin: 0 auto;
`;

const ImagePreview = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  width: 200px;
  height: 45px;
  background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
  background-color: #4CAF50;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #45a049;
  }
`;



const Banner = () => {
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

  const baseUrl = import.meta.env.VITE_APP_URL;
  const { data: banner, isLoading, isError } = useQuery({
    queryKey: ['banner'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/banner_images/`);
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (banner) {
      const bannerImages = banner.banner_images.map((image) => ({
        ...image,
        image: baseUrl + image.image, // Concatenate base URL with image path
      }));
      setPreviews(bannerImages.map((image) => image.image)); // Update previews with URLs
    }
  }, [banner]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      files.forEach(async (file) => {
      if (file) {
        console.log(file)
        formData.append('title',"Sample image")
        formData.append('image', file); 
        const response = await axios.post(
        `${baseUrl}/api/banner_images/`,
        formData,
        config
      );
      console.log(response.data);
      }
    });
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminContainer>
      <form onSubmit={handleUpload}>
        <div className="flex md:col-span-2  flex-col gap-2 ">
          <label className="text-lg">Product Images:</label>

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
                          previews[index] ? 'bg-white' : 'bg-black/20'
                        } dropzone grid content-center h-full mx-auto lg:w-[70%] rounded-xl`,
                      })}
                    >
                      <input {...getInputProps()} />
                      {previews[index] ? (
                        <img
                          src={previews[index]}  // Correct src attribute
                          alt={`Preview ${index + 1}`}
                          className="w-[80%] h-auto my-5 rounded-lg content-center mx-auto"
                        />
                      ) : (
                        <div className="p-3">
                          <BsFillArrowUpCircleFill
                            style={{
                              fontSize: '16px',
                              marginBottom: '10px',
                              color: 'black',
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
         <div className='flex mx-auto'>
           <Button type="submit">Upload Images</Button>
         </div>
        </div>
      </form>
    </AdminContainer>
  );
};

export default Banner;