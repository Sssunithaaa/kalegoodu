import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { createPageContent } from '../../../services/index/pageContent'; // Update this import based on your setup

const Button = styled.button`
  width: 200px;
  height: 45px;
  background-image: radial-gradient(...); /* Keep your gradient styles here */
  background-color: #4CAF50;
  color: black;
  display: flex;
  margin-inline: auto;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #45a049;
  }
`;

const AboutUsForm = () => {
  const [image, setImage] = useState(null);
  const [paragraph, setParagraph] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseUrl = import.meta.env.VITE_APP_URL; // Ensure this URL is correct

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('page_name', 'About Us');
    formData.append('content', paragraph);

    // Append each image file to formData
    if (image) {
      formData.append('page_image', image);  // Make sure the field name matches your Django API expectation
    }

    try {
      await createPageContent(formData); // Assuming createPageContent handles the axios call
      toast.success('About Us section added successfully!');
      setImage(null);
      setParagraph('');
    } catch (error) {
      toast.error('Failed to add About Us section');
      console.log('Error adding About Us:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add About Us Section</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <ToastContainer />
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-lg font-medium mb-2">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paragraph" className="block text-gray-700 text-lg font-medium mb-2">Paragraph</label>
          <textarea
            id="paragraph"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows="4"
            required
          ></textarea>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add About Us'}
        </Button>
      </form>
    </div>
  );
};

export default AboutUsForm;
