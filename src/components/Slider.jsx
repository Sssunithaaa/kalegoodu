import React, { useState, useMemo, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import styled from "styled-components";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion,AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/index/products';
import ProductCard from './ProductCard';
import { SectionWrapper } from '../hoc';
import { fadeIn } from '../utils/motion';

const fetchProductsBySaleType = async (saleTypeId, page=1) => {
  if (!saleTypeId) {
    throw new Error("saleTypeId is undefined");
  }
  const response = await fetch(
    `https://kalegoodupractice.pythonanywhere.com/api/products_by_saletype/${saleTypeId}/?page=${page}`
  );
  
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

const ProductCarousel = ( {saleTypeId} ) => {

   const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isLoading, isError } = useQuery({
  queryKey: ['products', saleTypeId, currentPage],
  queryFn: () => fetchProductsBySaleType(saleTypeId, currentPage),
  enabled: !!saleTypeId, // Only execute query if saleTypeId is truthy
  keepPreviousData: true,
  refetchOnWindowFocus: false, // Refetch data when the window regains focus
   
    refetchOnMount: true, // Ensures data refetches on component mount
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache for 30 minutes
  onError: (error) => {
    console.error('Error fetching products:', error);
  },
  
  refetchOnReconnect:true,

    suspense: false // Disable React Suspense for this query

});
  const [currentSlide, setCurrentSlide] = useState(0);
const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  afterChange: (index) => setCurrentSlide(index),
  prevArrow: currentSlide > 0 ? <SamplePrevArrow /> : null,
  nextArrow: hasMore ? <SampleNextArrow /> : null,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: Math.min(allProducts.length, 4),
        centerMode: allProducts.length > 4,
        centerPadding: allProducts.length > 4 ? "30px" : "0px",
      },
    },
    {
      breakpoint: 1024, // iPad and similar devices
      settings: {
        slidesToShow: Math.min(allProducts.length, 3),
        centerMode: allProducts.length > 3,
        centerPadding: allProducts.length > 3 ? "30px" : "0px",
      },
    },
    {
      breakpoint: 768, // Smaller tablets or larger phones
      settings: {
        slidesToShow: Math.min(allProducts.length, 2),
        centerMode: allProducts.length > 2,
        centerPadding: allProducts.length > 2 ? "30px" : "0px",
      },
    },
    {
      breakpoint: 540, // Small screens
      settings: {
        slidesToShow: Math.min(allProducts.length, 1),
        centerMode: allProducts.length > 1,
        centerPadding: allProducts.length > 1 ? "30px" : "0px",
      },
    },
  ],
};




useEffect(() => {
  if (data?.results) {
    setAllProducts((prev) => {
      const newProducts = data.results.filter(
        (newProduct) =>
          newProduct.visible && // Include only products with visible === true
          !prev.some((prevProduct) => prevProduct.product_id === newProduct.product_id) // Check for uniqueness
      );
      return [...prev, ...newProducts]; // Append only unique and visible products
    });
    setHasMore(!!data.next); // Check if there's more data
  }
}, [data]);



useEffect(() => {
  if (allProducts?.length !== 0 && currentSlide + settings.slidesToShow >= allProducts.length && hasMore) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
}, [currentSlide, allProducts, hasMore, settings.slidesToShow]);









  
 return (
    <div className="md:px-4 px-4 mx-auto flex flex-col relative">
      {isError ? (
        <div className="text-center py-4 text-red-500">
          Failed to load products. Please try again later.
        </div>
      ) : (
        <AnimatePresence>
          {isLoading ? (
            <div className="flex slider overflow-x-auto space-x-4">
  {Array.from({ length: 5 }).map((_, index) => (
    <motion.div
      key={index}
      className="flex-shrink-0 w-72"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="rounded-md shadow-md bg-gray-100 p-4">
        <Skeleton height={230} className="mb-2" />
        <Skeleton count={2} />
      </div>
    </motion.div>
  ))}
</div>

          ) : (
            <Slider {...settings}>
              {allProducts?.map((product, index) => (
                <motion.div
                  key={product.product_id}
                  className="px-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.3 * index, duration: 0.6 }}
                >
                  <ProductCard padding="py-2 my-2" product={product} />
                </motion.div>
              ))}
            </Slider>
          )}
        </AnimatePresence>
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
  cursor: pointer;
  z-index: 2;
  &:hover {
    color: grey;
  }
`;

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <Arrow onClick={onClick} style={{ color: "black", right: '-50px' }}>
      &#8250;
    </Arrow>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Arrow onClick={onClick} style={{ color: "black", left: '-10px' }}>
      &#8249;
    </Arrow>
  );
};




export default SectionWrapper(ProductCarousel, "");
