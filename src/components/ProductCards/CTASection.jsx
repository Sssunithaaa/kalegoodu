// CTASection.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';

export const CTASection = ({ product, cartCounter, setCartCounter }) => {
  const [productCounter, setProductCounter] = useState(0);
  const { addToCart, setIsCartVisible } = useContext(CartContext);

  const addProduct = () => setProductCounter(prev => prev + 1);
  const removeProduct = () => setProductCounter(prev => (prev > 0 ? prev - 1 : 0));

  const handleAddToCart = () => {
    // Create a product object to pass to addToCart
    const productDetails = {
      ...product,
      quantity: productCounter,
    };

    // Add the product to the cart
    addToCart(productDetails);

    // Update cart counter
    setCartCounter(prev => prev + productCounter);
    
    // Reset product counter
    setProductCounter(0);
  };

  return (
    <div className='flex flex-col justify-center items-center gap-4 md:flex-row'>
      {/* Amount required */}
      <div className='flex w-full bg-light-grayish-blue justify-between items-center px-6 py-2 rounded-xl mt-2
        md:w-1/3 md:px-3 md:mt-0'>
        {/* Minus button */}
        <div>
          <button 
            onClick={removeProduct}
            className='font-bold text-orange text-2xl pb-1'
          >
            -
          </button>
        </div>

        {/* Quantity */}
        <div className='font-bold'>
          {productCounter}
        </div>

        {/* Plus button */}
        <div>
          <button 
            onClick={addProduct}  
            className='font-bold text-orange text-2xl w-[1rem] pb-1'
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart Button */}
      <button 
        onClick={handleAddToCart}
        className='w-full bg-orange text-white py-4 rounded-xl font-bold 
          md:w-2/3'
      >
        <div className='flex gap-4 justify-center'>
          <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="currentColor" fillRule="nonzero"/>
          </svg>
          Add to cart
        </div>
      </button>
    </div>
  );
};
