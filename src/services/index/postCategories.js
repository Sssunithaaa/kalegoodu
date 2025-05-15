import axios from "axios";
import api from "./api";
const url = import.meta.env.VITE_APP_URL;

export const getAllCategories = async (search = "", sort = "") => {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);

    if (sort === "visible-true" || sort === "visible-false") {
      params.append("sort_by", "visible");
      params.append("sort_order", sort === "visible-true");
    } else if (sort) {
      const [field, order] = sort.split("-");
      params.append("sort_by", field);
      params.append("sort_order", order);
    }

    // If there are query parameters, append them; otherwise, use the base URL
    const urlWithParams = params.toString()
      ? `${url}/api/categories/?${params.toString()}`
      : `${url}/api/categories/`;
  
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
   const response =await axios.get(`${url}/api/visible-categories/`);
    
  //  const filteredCategories = await response.data.categories.filter(category => category.visible);
  //  return filteredCategories;
    return response.data.categories

    
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getAllSubCategories = async (search = "", sort = "", page = 1) => {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);

    if (sort === "visible-true" || sort === "visible-false") {
      params.append("sort_by", "visible");
      params.append("sort_order", sort === "visible-true" ? "true" : "false");
    } else if (sort) {
      const [field, order] = sort.split("-");
      params.append("sort_by", field);
      params.append("sort_order", order);
    }

    // 👇 Add the current page
    params.append("page", page);

    const urlWithParams = `${url}/api/list-subcategories/?${params.toString()}`;
    const response = await axios.get(urlWithParams);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
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

    const { data } = await api.post(
      `/api/add_category/`,
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

    const response = await api.put(
      `/api/update_category/${slug}/`,
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

export const getSubcategoriesByCategory = async ({ id }) => {
  try {
    const { data } = await axios.get(`${url}/api/subcategories_by_category/${id}/`);    
    return data?.subcategories;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSubcategoriesByCategories = async (categoryIds) => {
  try {
    const { data } = await axios.get(`${url}/api/subcategories_by_categories/`, {
      params: {
        category_ids: Array.isArray(categoryIds) ? categoryIds.join(",") : categoryIds, 
      },
    });

    return data.subcategories;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};


export const getSubcategoriesById= async ({ subcategoryId }) => {
  try {
    const { data } = await axios.get(`${url}/api/subcategory/${subcategoryId}/`);
    
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    else if(error.response && error.response.data.error)
      throw new Error(error.response.data.error);
    throw new Error(error.message);
  }
};

export const getProductsBySubcategory = async ({ slug }) => {
  try {
    const { data } = await axios.get(`${url}/api/products_by_subcategory/${slug}/`);
    
    return data?.category;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
