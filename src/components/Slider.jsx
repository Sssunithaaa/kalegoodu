import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from 'react-slick';
import styled from "styled-components";
import { img, img1, img2, img3, img4 } from '../assets/images';

const products = [
  { id: 1, image: img, name: "Product 1" },
  { id: 2, image: img1, name: "Product 2" },
  { id: 3, image: img2, name: "Product 3" },
  { id: 4, image: img3, name: "Product 4" },
  // Add more products as needed
];

const ProductCarousel = () => {
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
        breakpoint: 1024, // for screens smaller than 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // for screens smaller than 768px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // for screens smaller than 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="px-10 lg:mx-4 ">
      <Slider {...settings}>
        {products.map(product => (
          <div className="mx-6 my-3" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}

const Arrow = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  font-size: 30px;
  color: black;
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
      style={{ ...style, right: '10px' }}
    >
      {/* &#8250; */}
    </Arrow>
  );
}

const SamplePrevArrow = (props) => {
  const { className, onClick, style } = props;
  return (
    <Arrow
      className={className}
      onClick={onClick}
      style={{ ...style, left: '10px' }}
    >
      {/* &#8249; */}
    </Arrow>
  );
}

export default ProductCarousel;
