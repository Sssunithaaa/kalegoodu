import axios from "axios";

const url = import.meta.env.VITE_APP_URL;

export const getAllOrders = async (page = 1, pageSize = 10, startDate = null, endDate = null) => {
  try {
    const params = {
      page,
      page_size: pageSize,
    };

    // Add date range filtering if specified
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    const response = await axios.get(`${url}/api/orders/`, { params });

    return response.data?.orders; // Adjust according to your API response structure
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};


export const getSingleOrder = async (id) => {
  try {
  
    const response = await axios.get(`${url}/api/order/${id}/`);
   
    return response.data.order;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};