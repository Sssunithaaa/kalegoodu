import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";

import { useQuery } from "@tanstack/react-query";
import { getProductNames } from "../../../services/index/products";
import { filterProducts } from "../../../utils/multiSelectTagUtils";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../components/Button";
import api from "../../../services/index/api";
const promiseOptions = async (inputValue) => {
  const { data: productsData } = await getProductNames();
  return filterProducts(inputValue, productsData);
};
const EmailForm = () => {
 
  const [emailTitle, setEmailTitle] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch product data
    const {data: products} = useQuery({
    queryKey: ["testimonial-products"],
    queryFn: getProductNames
  })

  const handleSendEmail = async () => {
    const emailData = {
      title: emailTitle,
      body: emailBody,
      products: selectedProducts.map((product) => product.value),
    };

    try {
      setLoading(true);
      const response = await api.post(`/api/send-promotional-emails/`,  {
      title: emailTitle,
      body: emailBody,
      products: [54],
    });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error sending email:", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer/>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Send Promotional Emails</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendEmail();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="emailTitle" className="text-gray-700 font-medium">
              Email Title:
            </label>
            <input
              id="emailTitle"
              type="text"
              value={emailTitle}
              onChange={(e) => setEmailTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="emailBody" className="text-gray-700 font-medium">
              Email Body:
            </label>
            <textarea
              id="emailBody"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              rows="5"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

         <div className="flex flex-col gap-2">
  <label htmlFor="products" className="text-gray-700 font-medium">
    Select or Create Products:
  </label>
  <CreatableSelect
    isMulti
    name="products"
    options={products?.map((product) => ({
      value: product.product_id,
      label: product.name,
    }))}
    loadOptions={promiseOptions}
    value={selectedProducts}
    onChange={(selectedOptions) => setSelectedProducts(selectedOptions)}
    className="basic-multi-select"
    classNamePrefix="select"
    placeholder="Select or create products"
  />
</div>


          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4  ${
              loading ? "bg-green-200" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Sending..." : "Send Email"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
