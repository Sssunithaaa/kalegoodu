import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { updatePageContent } from '../../../services/index/pageContent';


const PolicyForm = ({ title,data,id }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
 useEffect(()=> {
  setText(data?.content)
 },[data])
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  const formData = new FormData();
    formData.append('page_name', data?.page_name);
    formData.append('content', text);
    try {
      await updatePageContent(id,formData)
      toast.success(`${title} added successfully!`);
     
    } catch (error) {
      toast.error(`Failed to add ${title}`);
      console.error(`Error adding ${title}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 ">
      <h2 className="text-2xl font-semibold mb-4 mx-4">{title}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-2 m-4 rounded-lg shadow-md">
        <ToastContainer />
        <div className="mb-4">
          {/* <label htmlFor="text" className="block text-gray-700 text-lg font-medium mb-2">{title}</label> */}
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows="6"
            required
          ></textarea>
        </div>
        <Button className='py-4 px-2' type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : `Update ${title}`}
        </Button>
      </form>
    </div>
  );
};

export default PolicyForm;
