// src/Cart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const cartItems = [
  {
    id: 1,
    image: 'path-to-your-image1.jpg', // Replace with actual image paths
    name: 'FEET SCULPTURE',
    quantity: 1,
    price: '€658',
  },
  {
    id: 2,
    image: 'path-to-your-image2.jpg', // Replace with actual image paths
    name: 'SCULPTURE ARTWORK',
    quantity: 1,
    price: '€1200',
  },
];

const navigate = useNavigate()
const Cart = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      {cartItems.map(item => (
        <div key={item.id} className="flex justify-between items-center border-b py-4">
          <img src={item?.image} alt={item.name} className="w-24 h-24 object-cover" />
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <div className="flex items-center">
              <span className="text-gray-500">Quantity</span>
              <div className="flex items-center ml-2 border px-2 py-1">
                <button className="text-lg">{"<"}</button>
                <span className="mx-2">{item.quantity}</span>
                <button className="text-lg">{">"}</button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{item.price}</p>
            <button className="text-red-500 hover:text-red-700">&times;</button>
          </div>
        </div>
      ))}
      <div className="border-t py-4 flex justify-between items-center">
        <span className="text-lg font-bold">TOTAL:</span>
        <span className="text-lg font-bold">₹1858</span>
      </div>
      <button onClick={()=>navigate("/checkout")} className="w-full text-[18px] text-white bg-orange py-3 rounded-md font-semibold">
        Proceed to checkout
      </button>
    </div>
  );
}

export default Cart;
