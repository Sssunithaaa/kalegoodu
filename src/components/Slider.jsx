import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import styled from "styled-components";
import ModalCard from "./ModalCard";
import ProductModal from './ProductModal';
import { img1, img2, img3 } from '../assets/images'; // Import your images

const ProductCarousel = () => {
  const [products] = useState([
    { id: 1, name: 'Product 1', price: '€658', rating: 4, description: 'Description for Product 1', img: img1 },
    { id: 2, name: 'Product 2', price: '€758', rating: 5, description: 'Description for Product 2', img: img2 },
    { id: 3, name: 'Product 3', price: '€858', rating: 3, description: 'Description for Product 3', img: img3 },
    // Add more products as needed
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (productId) => {
    setSelectedProduct(products.find((p) => p.id === productId));
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="px-10 relative">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} onClick={() => handleCardClick(product.id)}>
            <ModalCard product={product} />
          </div>
        ))}
      </Slider>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const Arrow = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  font-size: 30px;
  color: #000000;
  cursor: pointer;
  z-index: 2;
  &:hover {
    color: grey;
  }
`;

const SampleNextArrow = (props) => {
  const { className, onClick, style } = props;
  return (
    <Arrow
      className={className}
      onClick={onClick}
      style={{ ...style, right: '-50px' }} // Adjust the position
    >
      &#8250;
    </Arrow>
  );
};

const SamplePrevArrow = (props) => {
  const { className, onClick, style } = props;
  return (
    <Arrow
      className={className}
      onClick={onClick}
      style={{ ...style, left: '-50px' }} // Adjust the position
    >
      &#8249;
    </Arrow>
  );
};

export default ProductCarousel;
