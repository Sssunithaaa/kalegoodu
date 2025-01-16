import axios from "axios";
 const url = import.meta.env.VITE_APP_URL;
export const getAllProducts = async (page=1,search="") => {
  try {
    const response = await axios.get(
      `${url}/api/products/`,
      { params: { page ,search} } // Pass the page as a query parameter
    );
   
     return {
      products: response.data.results.products, // List of products
      totalCount: response.data.count, // Total number of products
      next: response.data.next, // URL for the next page
      previous: response.data.previous, // URL for the previous page
    };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};


export const getAllProductss = async (page = 1,search="") => {
  try {
    const response = await axios.get(
      `${url}/api/list_products/`,
      { params: { page ,search} } // Pass the page as a query parameter
    );
    return {
      products: response.data.results, // List of products
      totalCount: response.data.count, // Total number of products
      next: response.data.next, // URL for the next page
      previous: response.data.previous, // URL for the previous page
    };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getProductsByCategory = async (id) => {
  try {
    const response = await axios.get(
      `${url}/api/products_by_category/${id}/`
    );

    return response.data?.results
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSingleProduct = async (id) => {
  try {
  
    const response = await axios.get(`${url}/api/products/${id}/`);
   
    return response.data.product;
  } catch (error) {

    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getProductNames = async (id) => {
  try {
  
    const response = await axios.get(`${url}/api/products-product-id/`);
   
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};


export const deleteProduct = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/${slug}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProduct = async ({ updatedData, id }) => {
  try {
   const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.put(`${url}/api/update_product/${id}/`, updatedData, config);
   
    return response.data;
  } catch (error) {
   
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createProduct = async ( formData ) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
   
    const { data } = await axios.post(`${url}/api/add_product/`, formData,config);
    
    return data;
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data)
      throw new Error(error.response.data.message);
    
    throw new Error(error.message);
  }
};


