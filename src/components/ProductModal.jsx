import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity,setQuantity] = useState(1);
  const handleAddToCart = () => {
    addToCart({...product,quantity});
    onClose();
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] md:mt-0 mt-[15%] overflow-y-auto bg-gray-200 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white lg:max-w-2xl max-w-lg mx-4 p-8 rounded-lg shadow-lg relative">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none" 
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <img src={product.img} alt={product.name} className="w-full rounded-lg" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-xl font-medium text-gray-600 mb-4">€{product.price}</p>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <span className="text-yellow-400">
                  {'★'.repeat(product.rating)}
                </span>
                <span className="text-gray-300">
                  {'★'.repeat(5 - product.rating)}
                </span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2">Quantity</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                min="1" 
                className="w-16 p-2 border border-gray-300 rounded" 
                defaultValue="1" 
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <button className="w-full bg-orange-600 text-white py-2 rounded-lg" onClick={handleAddToCart}>
              Add to cart
            </button>
            <button className="w-full mt-2 text-orange-600">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;



