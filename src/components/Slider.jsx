import React,{useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import styled from "styled-components";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/index/products';
import ProductCard from './ProductCard';
import { useStateContext } from '../context/ContextProvider';
import { SectionWrapper } from '../hoc';
import { fadeIn, slideIn, zoomIn } from '../utils/motion';

const ProductCarousel = ({ saleType }) => {
  const { data: products,isLoading, isLoadingError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts
  });
 

  const bestSellerMode = Boolean(saleType);
  const filteredProducts = bestSellerMode 
    ? products?.filter(product => product?.sale_types.some(type => type.name === saleType))
    : products;
const [currentSlide, setCurrentSlide] = useState(0);
const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5, // Keep as 5 for desktop
  slidesToScroll: 1,
  initialSlide: 0,
    afterChange: (index) => setCurrentSlide(index),
    prevArrow: currentSlide > 0 ? <SamplePrevArrow /> : null,
    nextArrow: currentSlide === filteredProducts?.length -1 ? null : <SampleNextArrow />,
  centerMode: false, // Not needed for larger screens
  responsive: [
     {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
      },
    },
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
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
        centerMode:true,
        centerPadding: '30px', // Show part of the next slide
      },
    },
    
  ],
};
console.log(currentSlide)

 return (
  <div className="md:px-4 px-4 mx-auto flex flex-col relative">
    <Slider {...settings}>
      {isLoading || isLoadingError ? (
        // <SkeletonContainer>
          [...Array(5)].map((_, index) => (
            <SkeletonCard key={index}>
              <Skeleton height={230} />
              <Skeleton count={2} />
            </SkeletonCard>
          ))
        // </SkeletonContainer>
      ) : (
        [...filteredProducts]?.reverse().map((product,index) => (
          <motion.div variants={fadeIn("","",index*0.3,1)} className='px-2' key={product.product_id}>
            <ProductCard padding="py-2 my-2" product={product} />
          </motion.div>
        ))
      )}
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
  // color: black !important;
  cursor: pointer;
  z-index: 2;
  &:hover {
    color: grey;
  }
`;

const SampleNextArrow = (props) => {
  const {  onClick } = props;
  return (
    <Arrow
      className="text-[#000000]"
      onClick={onClick}
      style={{color:"black" , right: '-50px' }}
    >
      &#8250;
    </Arrow>
  );
};

const SamplePrevArrow = (props) => {
  const {  onClick } = props;
  return (
    <Arrow
      
      className="text-[#000000]"
      onClick={onClick}
      style={{color:"black",  left: '-10px' }}
    >
      &#8249;
    </Arrow>
  );
};

const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap to the next line on smaller screens */
  justify-content: space-between;
`;

const SkeletonCard = styled.div`
  flex: 1;
  padding: 10px;
  @media (min-width: 1024px) and (max-width: 1500px) {
    flex: 0 0 20%; /* For larger tablets */
    max-width: 20%;
  }
  @media (max-width: 1024px) {
    flex: 0 0 100%; /* For tablets */
    max-width: 100%;
  }
  @media (max-width: 768px) {
    flex: 0 0 80%; /* For small tablets or large phones */
    max-width: 80%;
  }
  @media (max-width: 480px) {
    flex: 0 0 100%; /* For mobile devices */
    max-width: 100%;
  }
`;


export default SectionWrapper(ProductCarousel,"");
