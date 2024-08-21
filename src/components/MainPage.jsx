import React, { useEffect, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import Hero from './Hero';
import Title from './Title';

import { img1, img2, img3 } from '../assets/images';
import ClipLoader from 'react-spinners/ClipLoader';

// Lazy load components
const ProductCarousel = React.lazy(() => import('./Slider'));
const Categories = React.lazy(() => import('./Categories'));
const Testimonials = React.lazy(() => import('./Testimonials/Testimonials'));
const AboutUs = React.lazy(() => import('./AboutUs'));

const MainPage = () => {
  useEffect(() => {
    window.scrollTo(0, 20);
  }, []);

  const [products] = useState([
    { id: 1, name: 'Product-1', price: 1, rating: 4, description: 'Description for Product 1', img: img1 },
    { id: 2, name: 'Product-2', price: 758, rating: 5, description: 'Description for Product 2', img: img2 },
    { id: 3, name: 'Product-3', price: 858, rating: 3, description: 'Description for Product 3', img: img3 },
  ]);

  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full">
        <Hero />
      </div>
      <Suspense fallback={<ClipLoader color="#36d7b7" size={50} />}>
        <div className="my-6">
          <Title>Shop by collection</Title>
          <Categories />
        </div>
        <div className="w-full my-6">
          <Title>Trendiest new arrivals</Title>
          <ProductCarousel products={products} />
        </div>
        <div className='w-full my-6 '>
          <Title>Best Sellers</Title>
          <ProductCarousel products={products} saleType="Best Seller" />
        </div>
        <div className='my-6'>
          <Title>About us</Title>
          <AboutUs />
        </div>
        <div className='my-6'>
          <Testimonials />
        </div>
      </Suspense>
      <div className='hover:cursor-pointer' onClick={() => navigate("/admin")}>
        <Title>Admin</Title>
      </div>
    </div>
  );
};

export default MainPage;
