// CTASection.js
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import styled from 'styled-components';
const Button = styled.button`
  width: 100%;
  height: 45px;
background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
  margin-top: 10px;
  border: none;
  
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #9e7f6b; /* Slightly darker color */
  }
`;
export const CTASection = ({ product, cartCounter, setCartCounter }) => {
  const [productCounter, setProductCounter] = useState(1);
  const { addToCart, setIsCartVisible,setLoading } = useContext(CartContext);

  const addProduct = () => setProductCounter(prev => prev + 1);
  const removeProduct = () => setProductCounter(prev => (prev > 0 ? prev - 1 : 0));

  const handleAddToCart = () => {
    // Create a product object to pass to addToCart
    
    const productDetails = {
      ...product,
      quantity: productCounter === 0 ? 1 : productCounter,
    };
 

    // Add the product to the cart
    addToCart(productDetails);

    // Update cart counter
    setCartCounter(prev => prev + productCounter);
    
    // Reset product counter
    setProductCounter(0);
    setLoading(true);
     setTimeout(()=> {
      setLoading(false)
     },1000)
    setTimeout(()=> {
      setIsCartVisible(true)
    },1000)
  };

  return (
    <div className='flex flex-col justify-center w-[100%] items-center px-4 gap-x-4 lg:flex-row'>
      {/* Amount required */}
      <div className='flex w-full bg-gray-50 justify-between items-center px-6 py-2 rounded-xl
        md:w-1/4 md:mt-0'>
        {/* Minus button */}
        <div>
          <button 
            onClick={removeProduct}
            className='font-bold text-gray-700 text-2xl pb-1'
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
            className='font-bold text-gray-700 text-2xl w-[1rem] pb-1'
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart Button */}
     <div className='md:w-3/4 py-2 w-[100%]'>
       <Button 
        onClick={handleAddToCart}
        className='py-2'
      >
        <div className='w-[100%] flex gap-4 justify-center'>
          
          Add to cart
        </div>
      </Button>
     </div>
    </div>
  );
};
