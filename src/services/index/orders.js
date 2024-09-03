import axios from "axios";
 const url = import.meta.env.VITE_APP_URL;
export const getAllOrders = async () => {
  try {
    const response = await axios.get(
      `${url}/api/orders/`
    );
   
    return response.data?.orders
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