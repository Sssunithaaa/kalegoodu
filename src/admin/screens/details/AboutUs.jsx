import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Dropzone from 'react-dropzone';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { createPageContent, getPageContents, updatePageContent } from '../../../services/index/pageContent'; 
import Button from '../../../components/Button';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import axios from 'axios';
import BackButton from '../../BackButton';
import 'react-quill/dist/quill.snow.css'; 
import ReactQuill from 'react-quill';
const AboutUsForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [paragraph, setParagraph] = useState('');
  const [pageId, setPageId] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['page-contents'],
    queryFn: () => getPageContents(),
    
  });

  const baseUrl = import.meta.env.VITE_APP_URL;

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

  useEffect(() => {
    const aboutUsData = data?.[0];
    if (aboutUsData) {
      setParagraph(aboutUsData.content);
      setPageId(aboutUsData.pagecontent_id);

      if (aboutUsData.images?.[0]?.image) {
        setPreview(import.meta.env.VITE_CLOUD_URL+ aboutUsData.images[0].image);
      }
    }
  }, [data]);

  const handleFileChange = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setPreview(URL.createObjectURL(acceptedFiles[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('page_name', 'About Us');
    formData.append('content', paragraph);

    if (file) {
      formData.append('page_image', file);
    }

    try {
      if (pageId) {
        await updatePageContent(pageId, formData);
        toast.success('About Us section updated successfully!');
      } else {
        await createPageContent(formData);
        toast.success('About Us section added successfully!');
      }
    } catch (error) {
      toast.error('Failed to save About Us section');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/page-images/delete/${id}`);
      // queryClient.invalidateQueries(['page-contents']);
      toast.success('Image deleted successfully');
      setFile(null)
      setPreview(null)
    } catch (error) {
      toast.error('Failed to delete image');
      console.error('Error deleting image:', error.message);
    }
  };

  const aboutUsData = data?.[0]; // Move it here so it is accessible in JSX
  const handleImageUpload =  async () => {
    
    try {
      const formData = new FormData();
      formData.append("image",file)
         const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
    };
      const response = await axios.post(`${baseUrl}/api/add_page_image/1/`,formData,config);
      toast.success(response?.data?.message)
    } catch (error) {
      toast.error("Couldn't upload image!! Try again")
    }
  }
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex mb-4 w-full justify-start self-start">
    <BackButton />
  </div>
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Add or Update About Us Section</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        

        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-medium mb-2">Upload Image</label>
          <Dropzone onDrop={(acceptedFiles) => handleFileChange(acceptedFiles)} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({
                  className: `${preview ? 'bg-white' : 'bg-black/20'} dropzone grid content-center h-full mx-auto lg:w-[70%] rounded-xl`,
                })}
              >
                <input {...getInputProps()} />
                {preview ? (
                  <div>
                    <img src={preview} alt="Preview" className="w-[80%] h-auto my-5 rounded-lg content-center mx-auto" />
                    
                  </div>
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
          {aboutUsData?.images?.[0]?.image ? (
                      <DeleteButton type='button' onClick={() => handleDelete(aboutUsData?.pagecontent_id)}>
                        Delete
                      </DeleteButton>
                    ) : file ? <Button type='button' onClick={handleImageUpload}>Upload image</Button> : <div></div>}
        </div>

        <div className="mb-4">
          <label htmlFor="paragraph" className="block text-gray-700 text-lg font-medium mb-2">Paragraph</label>
          
           <ReactQuill
            theme="snow"
            value={paragraph}
            onChange={setParagraph}
            className="w-full h-full"
            placeholder="Add your content here..."
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : pageId ? 'Update About Us' : 'Add About Us'}
        </Button>
      </form>
    </div>
  );
};

export default AboutUsForm;
