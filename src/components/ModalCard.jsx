import React, { useState } from 'react';
import ProductModal from './ProductModal';

const ModalCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div >
      <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={handleCardClick}>
        <img src={product.img} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600">{product.price}</p>
      </div>
      <ProductModal product={product} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ModalCard;
