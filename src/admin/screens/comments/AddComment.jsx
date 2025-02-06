import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import {  getProductNames } from '../../../services/index/products';
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../BackButton';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css"; // Emoji styles
import { Quill } from "react-quill";
import * as Emoji from "quill-emoji";

Quill.register("modules/emoji", Emoji);

const Button = styled.button`
  width: 200px;
  height: 45px;
  background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
  background-color: #4CAF50;
  color: black;
  display:flex;
  margin-inline:auto;
  align-items:center;
  justify-content:center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #45a049;
  }
`;
const AddTestimonialForm = () => {
  const baseUrl = import.meta.env.VITE_APP_URL;

  // Form state
   const [productId, setProductId] = useState('');
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(3);
    const [visible, setVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {id} = useParams()
  const navigate = useNavigate()
   const isEditMode = Boolean(id)

  useEffect(() => {
       import("quill-emoji")
         .then((quillEmoji) => {
           Quill.register("modules/emoji", quillEmoji.default); // Register emoji module
           setIsEmojiLoaded(true); // Ensure re-render after registration
         })
         .catch((err) => console.error("Error loading quill-emoji:", err));
     }, []);
    
  const {data:comment,isFetching} = useQuery({
    queryKey: ["comment",id],
    queryFn: async ()=> {
      const response = await axios.get(`${baseUrl}/api/comments/${id}/`);
      return response.data.comment
    },
    enabled: isEditMode
  })
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
     const selectedProduct = products.find((product) => product.product_id === parseInt(productId));

      if(isEditMode){
        await axios.put(`${baseUrl}/api/update_comment/${id}/`, {
        product_name: selectedProduct ? selectedProduct.name : '',
        product: parseInt(productId),
        user_name: userName,
        text,
        rating,
        display: visible
      });
      toast.success('Testimonial Updated successfully!');
      } else {
        await axios.post(`${baseUrl}/api/allcomments/`, {
        product_name: selectedProduct ? selectedProduct.name : '',
        product: parseInt(productId),
        user_name: userName,
        text,
        rating,
        display: visible
      });
      toast.success('Testimonial added successfully!');
      setProductId('')
      setUserName('');
      setText('');
      setRating(1);
      setTimeout(()=>{
      navigate("/admin/comments/manage")
    },1500)
      }

      
      
    } catch (error) {
      toast.error('Failed to add testimonial');
      console.log('Error adding testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const {data:products,isLoading} = useQuery({
    queryKey: ["testimonial-products"],
    queryFn: getProductNames
  })

  
  useEffect(()=> {
   if(comment){
     setProductId(comment?.product);
    setUserName(comment?.user_name);
    setText(comment?.text);
    setRating(comment?.rating)
    setVisible(comment?.display)
   }
  },[comment])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex mb-4 w-full justify-start self-start">
    <BackButton />
  </div>
      <h2 className="text-2xl font-semibold mb-4">{isEditMode ? "Update Testimonials" : "Add Testimonial"}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <ToastContainer/>
        <div className="mb-4">
          <label htmlFor="productId" className="block text-gray-700 text-lg font-medium mb-2">Product</label>
          <select
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="" disabled>Select a product</option>
            {products?.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 text-lg font-medium mb-2">User Name</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 text-lg font-medium mb-2">Testimonial</label>
          {/* <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows="4"
            required
          ></textarea> */}
            <div className="mb-4">
                    <ReactQuill
            theme="snow"
            value={text}
            onChange={setText}
            className="w-full h-full"
            placeholder="Add your content here..."
            modules={{
              toolbar: [
                // Headings and Subheadings
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                
                // Font Style, Size, and Weight
                [{ font: [] }, { size: [] }],
                
                // Text Formatting
                ['bold', 'italic', 'underline', 'strike'],
                
                // Text Color and Background Color
                [{ color: [] }, { background: [] }],
                
                // Alignment Options
                [{ align: [] }],
                
                // Lists and Indents
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                
                // Inline Blocks
                ['blockquote', 'code-block'],
                
                // Links and Images
             
          
                // Clear Formatting
                ['clean'],
                ['emoji']
              ],
              "emoji-toolbar":true,
              "emoji-textarea": false, // Disable emoji in textarea
              "emoji-shortname": true, 
            }}
          />
          
                  </div>

        </div>

        {/* <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 text-lg font-medium mb-2">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} {star === 1 ? 'star' : 'stars'}
              </option>
            ))}
          </select>
        </div> */}

         {/* <div className="mb-4">
           
          <label htmlFor="visibility" className="flex flex-row text-gray-700 text-lg font-medium mb-2"><input
            type="checkbox"
            id="visibility"
            checked={visible}
            value={visible}
            onChange={(e) => setVisible(e.target.value)}
            className="mx-2 border border-gray-300 rounded-md shadow-sm"
            
          /> {visible ? "Visible" : "Hidden"}</label>
         
        </div> */}

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isEditMode ? "Update Testimonial" : 'Add Testimonial'}
        </Button>
      </form>
    </div>
  );
};

export default AddTestimonialForm;
