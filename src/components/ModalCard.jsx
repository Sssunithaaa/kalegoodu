import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {img1} from '../assets/images'
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

const url = import.meta.env.VITE_APP_URL
const ModalCard = ({ product }) => {
    const { addToCart, toggleCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toggleCart();
    window.scrollTo(0, 0);
  };
  const navigate = useNavigate();

 
  const productImage = product?.images?.length > 0 ? `${url}${product?.images[0]?.image}` : img1;
   const displayValue = product?.name.replaceAll( " ","-");
 

  return (
     <div className="bg-white h-86 p-2  rounded-lg shadow-md cursor-pointer mx-2">
      <div onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}>
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-72 object-cover mb-4"
        />
        <h3 className="text-lg font-semibold h-12 my-2">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          {product.discounted_price > 0 && (
            <>
              <p className=" line-through text-gray-900 mr-2 ">Rs. {product.price}</p>
              <p className=" text-green-700 font-semibold">Rs. {product.discounted_price}</p>
            </>
          )}
          {product.discounted_price === 0 && (
            <p className="text-green-700 font-semibold">Rs. {product.price}</p>
          )}
        </div>
      </div>
      <Button onClick={handleAddToCart} className="text-[16px]">
        Add to cart
      </Button>
    </div>
  );
};

export default ModalCard;