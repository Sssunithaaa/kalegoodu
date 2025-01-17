import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Updates an image for a product.
 * @param {string} baseUrl - The base URL for the API.
 * @param {string} productImageId - The ID of the product image to update.
 * @param {File} file - The new image file.
 * @param {function} refetch - Function to refresh the data after successful update.
 * @param {function} setLoading - Function to update the loading state.
 */
 const updateImage = async (baseUrl, productImageId, file, refetch, setLoading,url) => {
  const formData = new FormData();
  formData.append('image', file);
  setLoading(true);
  try {
    await axios.put(
      `${baseUrl}/api/${url}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    toast.success('Image updated successfully!');
    refetch();
  } catch (error) {
    toast.error('Failed to update image');
    console.error('Error updating image:', error.message);
  } finally {
    setLoading(false);
  }
};

/**
 * Adds a new image to a product.
 * @param {string} baseUrl - The base URL for the API.
 * @param {string} productImageId - The ID of the product image to add.
 * @param {File} file - The new image file.
 * @param {function} refetch - Function to refresh the data after successful addition.
 * @param {function} setLoading - Function to update the loading state.
 */
 const addImage = async (baseUrl, productImageId, file, refetch, setLoading,url) => {
  const formData = new FormData();
  formData.append('image', file);
 
  setLoading(true);
  try {
    await axios.post(
      `${baseUrl}/api/${url}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    toast.success('Image added successfully!');
    refetch();
  } catch (error) {
    toast.error('Failed to add image');
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export {addImage,updateImage}
