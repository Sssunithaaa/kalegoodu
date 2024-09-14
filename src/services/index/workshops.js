import axios from "axios";
 const url = import.meta.env.VITE_APP_URL;
export const getAllWorkshops = async (
 
) => {
  try {
   
    const response = await axios.get(
      `${url}/api/workshops/`
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

    const { data } = await axios.post(
      `${url}/api/workshops-create/`,
      formData,
      config
    );
    return data;
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateWorkshop = async ({ updatedData, slug }) => {
  try {
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.put(
      `${url}/api/update_full_category/${slug}/`,
      updatedData,
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
    console.log(data)
    return data?.workshop;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};