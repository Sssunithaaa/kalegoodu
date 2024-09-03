import axios from "axios";
 const url = import.meta.env.VITE_APP_URL;
export const createPageContent = async () => {
  try {
    const response = await axios.post(
      `${url}/api/page-contents/`
    );
   
    return response.data?.page_contents
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getPageContents = async () => {
    try {
        const response = await axios.get(`${url}/api/page-contents/`);
        return response?.data?.page_contents;
    } catch (error) {
        
    }
}