import React, { useState } from 'react';
import useAdminData from '../hooks/AdminDataHook';
import { fetchCarouselProducts, deleteCarouselProduct, addCarouselProduct, editCarouselProduct } from '../api/CarouselApi'
import { toast } from 'react-toastify';
import ProductModal from './ProductModal';
import { img1,img2,img3 } from '../../assets/images';
const ProductCarouselAdmin = () => {
  const {
    data: products,
    isLoading,
    isFetching,
    handleDelete,
    refetch,
  } = useAdminData({
    dataQueryFn: fetchCarouselProducts,
    dataQueryKey: 'carouselProducts',
    mutateDeleteFn: deleteCarouselProduct,
    deleteDataMessage: 'Product deleted successfully!',
  });
    const productss=[
    { id: 1, name: 'Product 1', price: 658, rating: 4, description: 'Description for Product 1', img: img1 },
    { id: 2, name: 'Product 2', price: 758, rating: 5, description: 'Description for Product 2', img: img2 },
    { id: 3, name: 'Product 3', price: 858, rating: 3, description: 'Description for Product 3', img: img3 },
   
  ];
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (newProduct) => {
    addCarouselProduct(newProduct)
      .then(() => {
        toast.success('Product added successfully!');
        refetch();
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  };

  const handleEditProduct = (editedProduct) => {
    editCarouselProduct(editedProduct)
      .then(() => {
        toast.success('Product updated successfully!');
        refetch();
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProduct = (product) => {
    if (isEditMode) {
      handleEditProduct(product);
    } else {
      handleAddProduct(product);
    }
    handleCloseModal();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Carousel Admin</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4"
        onClick={openAddModal}
      >
        Add Product
      </button>
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap">
          {productss.map((product) => (
            <div key={product.id} className="m-4 text-center relative">
              <img
                src={product.img}
                alt={product.name}
                className="w-40 h-40 rounded-full object-cover mx-auto"
              />
              <div className="mt-2">{product.name}</div>
              <button
                onClick={() => openEditModal(product)}
                className="bg-green-500 text-white px-4 py-2 mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-4 py-2 mt-2 ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default ProductCarouselAdmin;
