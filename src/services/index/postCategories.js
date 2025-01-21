import axios from "axios";
const url = import.meta.env.VITE_APP_URL;

export const getAllCategories = async (search = "", sort = "") => {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);

    if (sort === "visible-true" || sort === "visible-false") {
      params.append("sort_by", "visible");
      params.append("sort_order", "asc");
      params.append("visible", sort === "visible-true");
    } else if (sort) {
      const [field, order] = sort.split("-");
      params.append("sort_by", field);
      params.append("sort_order", order);
    }

    // If there are query parameters, append them; otherwise, use the base URL
    const urlWithParams = params.toString()
      ? `${url}/api/categories/?${params.toString()}`
      : `${url}/api/categories/`;
    console.log(urlWithParams); // Debugging URL
    const response = await axios.get(urlWithParams);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
export const getAllCategoriess = async () => {
  try {
   const response =await axios.get(`${url}/api/categories/`);
 
     return response.data.categories.filter(category => category.visible);
   

    
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};




export const getCategoryImages = async () => {
  try {
    const response = await axios.get(`${url}/api/category_images/`);
 
    return response.data.category_images; // Adjust to the actual response structure
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
   ;
    throw new Error(error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    

    const { data } = await axios.delete(`${url}/api/category/${id}/delete/`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createCategory = async (formData) => {
  try {
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(
      `${url}/api/add_category/`,
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

export const updateCategory = async ({ updatedData, slug }) => {
  try {
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.put(
      `${url}/api/update_category/${slug}/`,
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

export const getSingleCategory = async ({ slug }) => {
  try {
    const { data } = await axios.get(`${url}/api/categories/${slug}/`);
    
    return data?.category;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
