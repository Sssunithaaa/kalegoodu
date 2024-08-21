import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import styled from "styled-components";

import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/index/products';
import ProductCard from './ProductCard';

const ProductCarousel = ({saleType}) => {
 
  

   const {data:products,isLoading,isError} = useQuery({
    queryKey:["products"],
    queryFn: getAllProducts
   })
   const bestSellerMode = Boolean(saleType)
   const filteredProducts = bestSellerMode 
    ? products?.filter(product => product?.sale_types.some(type => type.name === saleType))
    : products;
    
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
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
    <div className="px-10 mx-auto relative">
      <Slider {...settings}>
        {filteredProducts?.map((product) => (
          <div className='px-2' key={product.product_id}  >
            <ProductCard  padding="py-2 my-2"  product={product} />
          </div>
        ))}
      </Slider>
     
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
      style={{ ...style,left: '-50px' }} // Adjust the position
    >
      &#8249;
    </Arrow>
  );
};

export default ProductCarousel;
