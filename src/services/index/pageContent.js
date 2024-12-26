import axios from "axios";
 const url = import.meta.env.VITE_APP_URL;
export const createPageContent = async (formData) => {
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
    };
  try {
    const response = await axios.post(
      `${url}/api/add_page_contents/`,formData,config
    );
   
    return response?.data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
  
    throw new Error(error.message);
  }
};
export const updatePageContent = async (pageId, formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await axios.put(`${url}/api/update_page_contents/${pageId}/`, formData, config);
    return response?.data;
  } catch (error) {
    // console.log('Error updating page content:', error);
    throw error;
  }
};

export const getPageContents = async () => {
    try {
        const response = await axios.get(`${url}/api/page-contents/`);
        return response?.data?.page_contents;
    } catch (error) {
        
    }
}