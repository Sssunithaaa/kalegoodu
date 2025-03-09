import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../../services/index/api';

const apiMethods = {
  post: api.post,
  put: api.put,
  delete: api.delete,
};

const useApiMutation = (method, getUrl, onSuccessCallback, successMessage, failureMessage) => {
  return useMutation({
    mutationFn: async ({ bannerImageId, data }) => {  
      const url = typeof getUrl === 'function' ? getUrl({ bannerImageId }) : getUrl;
      const response = await api[method](url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (successMessage) toast.success(successMessage);
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || failureMessage || "Something went wrong";
      toast.error(errorMessage);
      console.error("API Error:", error);
    },
    
  });
};


export default useApiMutation;


