import React, { useEffect, useState, Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './components/Hero';
import Title from './Title';
import { img1, img2, img3 } from '../assets/images';
import FullPageLoader from './FullPageLoader';
import {  useStateContext } from '../context/ContextProvider';
import { SectionWrapper } from '../constants';
import ScrollToTop from './ScrollToTop';
import axios from 'axios';

const ProductCarousel = React.lazy(() => import('./Slider'));
const Categories = React.lazy(() => import('./Categories'));
const Testimonials = React.lazy(() => import('./Testimonials/Testimonials'));
const AboutUs = React.lazy(() => import('./AboutUs'));
  const baseUrl = import.meta.env.VITE_APP_URL;

const TestImage = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/test-products`);
        setImage(response.data?.test_products?.[0]?.image);
      } catch (error) {
        console.error('Failed to fetch image', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {image ? (
        <img src={"https://res.cloudinary.com/dgkgxokru/"+image} alt="Product" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

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

  const {categoriesRef,newArrivalsRef,bestSellersRef,aboutUsRef,testimonialsRef} = useStateContext()
  

  return (
    <div>
      <ScrollToTop/>
      <div>
          <TestImage/>
        </div>
      <div className='max-h-screen'>
        < Hero/>
      </div>
      <Suspense fallback={<FullPageLoader />}>
        <div className="scroll-section my-6" ref={categoriesRef}>
          <Title>Shop by collection</Title>
          <Categories />
        </div>
       <div className="scroll-section w-full my-6" ref={newArrivalsRef}>
  <div className='relative mx-auto'>
    <Title>Trendiest new arrivals</Title>
    <ProductCarousel products={products} />
    
   
  </div>
</div>


        <div className="scroll-section w-full my-6" ref={bestSellersRef}>
  <div className='relative mx-auto'>
    <Title>Best Sellers</Title>
    <ProductCarousel products={products} saleType="Best Seller" />
    
  
  </div>
</div>     
        <div className='scroll-section my-6' ref={aboutUsRef}>
          <Title>About us</Title>
          <AboutUs />
        </div>
        <div className='scroll-section my-6' ref={testimonialsRef} home={true}>
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
