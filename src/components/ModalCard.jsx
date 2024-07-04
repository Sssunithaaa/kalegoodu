import React from 'react';

const ModalCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
      <img src={product.img} alt={product.name} className="w-full h-72 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600">€{product.price}</p>
    </div>
  );
};

export default ModalCard;
