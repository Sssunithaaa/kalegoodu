import React, { useState, useMemo, useEffect } from 'react';
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
  refetchOnWindowFocus: true, // Refetch data when the window regains focus
  staleTime: 20000, // Data will remain fresh for 5 seconds
  cacheTime: 10000, // Cached data will persist for 10 seconds after being unused
  retry: 3, // Retry failed queries up to 3 times
  retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  onError: (error) => {
    console.error('Error fetching products:', error);
  },
   refetchOnMount:true,
  refetchOnReconnect:true,
  retryOnMount:true,
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
  nextArrow:
   hasMore 
      ? <SampleNextArrow />
      :  null,
  responsive: [
    { breakpoint: 1500, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "30px",
      },
    },
  ],
};


useEffect(() => {
  if (data?.results) {
    setAllProducts((prev) => {
      const newProducts = data.results.filter(
        (newProduct) => !prev.some((prevProduct) => prevProduct.product_id === newProduct.product_id)
      );
      return [...prev, ...newProducts]; // Append only unique products
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
       allProducts?.length > 0 ? <Slider {...settings}>
          {isLoading ? (
            <SkeletonContainer>
              {[...Array(5)].map((_, index) => (
                <SkeletonCard key={index}>
                  <Skeleton height={230} />
                  <Skeleton count={2} />
                </SkeletonCard>
              ))}
            </SkeletonContainer>
          ) : (
            allProducts?.map((product, index) => (
              <motion.div variants={fadeIn("", "", index * 0.3, 1)} className="px-2" key={product.product_id}>
                <ProductCard padding="py-2 my-2" product={product} />
              </motion.div>
            ))
          )}
        </Slider> : <div>
                          <p>Loading products...</p>

          </div>
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


const SkeletonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SkeletonCard = styled.div`
  flex: 1;
  padding: 10px;
  @media (min-width: 1024px) and (max-width: 1500px) {
    flex: 0 0 20%;
    max-width: 20%;
  }
  @media (max-width: 1024px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
  @media (max-width: 768px) {
    flex: 0 0 80%;
    max-width: 80%;
  }
  @media (max-width: 480px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export default SectionWrapper(ProductCarousel, "");
