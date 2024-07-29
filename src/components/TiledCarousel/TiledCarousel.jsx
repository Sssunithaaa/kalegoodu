// src/TiledCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import { img1, img2, img3 } from '../../assets/images'; // Add all your images here
import styled from 'styled-components';
import {Carousel} from './Carousel'
import { img17, img18, img19, img20 } from '../../assets/images'
import { useNavigate } from 'react-router-dom';
const thumbnails = [
  img17, img18, img19, img20
];
const TiledCarousel = () => {
   const navigate=useNavigate()
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show one tile at a time
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const tiles = [
    
      { name: 'Product 1', price: '658', rating: 4, description: 'Description for Product 1', img: img1 },
      { name: 'Product 2', price: '758', rating: 5, description: 'Description for Product 2', img: img2 },
      { name: 'Product 3', price: '858', rating: 3, description: 'Description for Product 3', img: img3 },
   
      { name: 'Product 4', price: '658', rating: 4, description: 'Description for Product 4', img: img1 },
      { name: 'Product 5', price: '758', rating: 5, description: 'Description for Product 5', img: img2 },
      { name: 'Product 6', price: '858', rating: 3, description: 'Description for Product 6', img: img3 },
   
     
    
    // Add more tiles as needed
  ];

  return (
    <div className="px-10 mx-auto my-5 relative">
      <Slider {...settings}>
        {tiles.map((product, index) => (
          <div className='bg-white p-2 rounded-lg shadow-md cursor-pointer mx-2'>
           <Carousel>
        {thumbnails.map((image, index) => (
          <img
            className="object-cover"
            key={index}
            src={image}
          
            alt={`Slide ${index + 1}`}
          />
        ))}
      </Carousel>
     <div className='m-5'>
      <div onClick={()=> navigate(`/products/${product.name}`)}>
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600">₹ {product.price}</p>
     </div>
      <Button className='text-[16px]'>Add to cart</Button>
     </div>
      </div>
        ))}
      </Slider>
    </div>
  );
};

export default TiledCarousel;
