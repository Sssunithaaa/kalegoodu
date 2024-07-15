import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ProductModal = ({ product, isOpen, onClose, onSave, isEditMode }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    rating: '',
    description: '',
    img: '',
  });

  useEffect(() => {
    if (isEditMode && product) {
      setProductData(product);
    } else {
      setProductData({
        name: '',
        price: '',
        rating: '',
        description: '',
        img: '',
      });
    }
  }, [product, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(productData);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="img"
            value={productData.img}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default ProductModal;
