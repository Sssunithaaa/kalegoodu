import React from 'react'
import Dropzone from 'react-dropzone'
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const AddImage = ({ setFile, setPreview, preview, index }) => {
  const handleFileChange = (acceptedFile) => {
    // Update the specific index for file and preview
    setFile(index, acceptedFile[0]);
    setPreview(index, URL.createObjectURL(acceptedFile[0]));
  };

  return (
    <div>
      <div className="mx-auto w-[50%] h-90 content-center p-6 rounded-md">
        <Dropzone
          onDrop={handleFileChange}
          accept="image/*"
          className="h-fixed"
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps({
                className: `${
                  preview ? "bg-white" : "bg-black/40"
                } dropzone grid content-center h-full mx-auto lg:w-[70%] rounded-xl`,
              })}
            >
              <input {...getInputProps()} />
              {preview ? (
                <img
                  src={preview}
                  alt={`preview-${index}`} // Unique alt for accessibility
                  className="w-[40%] h-auto my-5 rounded-lg content-center mx-auto"
                />
              ) : (
                <div className="p-3">
                  <BsFillArrowUpCircleFill
                    style={{
                      fontSize: "20px",
                      marginBottom: "10px",
                      color: "black",
                    }}
                    className="w-full flex mx-auto"
                  />
                  <p className="text-center text-black font-semibold">
                    Drag and drop an image here, or click to select a file
                  </p>
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default AddImage;
