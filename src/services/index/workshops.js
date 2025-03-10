import axios from "axios";
import api from "./api";
 const url = import.meta.env.VITE_APP_URL;
export const getAllWorkshops = async (
 search=""
) => {
  try {
   
    const response = await axios.get(
      `${url}/api/workshops/`,{ params:  search }
    );
 
    return response.data?.workshops;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
   
    throw new Error(error.message);
  }
};



export const deleteWorkshop = async (id) => {
  try {
    

    const { data } = await axios.delete(`${url}/api/workshop/${id}/delete/`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createWorkshop = async (formData) => {
  try {
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await api.post(
      `/api/add_workshop/`,
      formData,
      config
    );
    return data;
  } catch (error) {
  
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateWorkshop = async ({ formData, slug }) => {
  try {
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
    };

    const response = await api.put(
      `/api/update_workshops/${slug}/`,
      formData,
      config
    );
    return response.data;
  } catch (error) {

    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSingleWorkshop = async ({ slug }) => {
  try {
  
    const { data } = await axios.get(`${url}/api/workshops/${slug}/`);
    return data?.workshop;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
