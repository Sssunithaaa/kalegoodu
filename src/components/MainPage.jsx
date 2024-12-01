// MainPage.js
import React, { useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Title from './Title';

import FullPageLoader from './FullPageLoader';
import { useStateContext } from '../context/ContextProvider';
import ScrollToTop from './ScrollToTop';


const ProductCarousel = React.lazy(() => import('./Slider'));
const Categories = React.lazy(() => import('./Categories'));
const Testimonials = React.lazy(() => import('./Testimonials/Testimonials'));
const AboutUs = React.lazy(() => import('./AboutUs'));

const MainPage = () => {
 
  
  

  const {marqueeRef,heroRef, categoriesRef, newArrivalsRef, bestSellersRef } = useStateContext();
  
    const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    // Scroll to the correct section based on the parameter
    if (section === "newArrivals" && newArrivalsRef.current) {
      newArrivalsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (marqueeRef && marqueeRef.current) {
      marqueeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // Add similar conditions for other sections if needed
  }, [location]);

  return (
    <div>
      <ScrollToTop />

      <div className='max-h-screen' ref={heroRef}>
        <Hero />
      </div>

      <Suspense fallback={<FullPageLoader />}>
        <div className="scroll-section my-6" ref={categoriesRef}>
          <Title>Shop by collection</Title>
          <Categories />
        </div>
        <div className="scroll-section w-full my-6" ref={newArrivalsRef}>
          <div className='relative mx-auto'>
            <Title>Trendiest new arrivals</Title>
            <ProductCarousel saleTypeId={9} />
          </div>
        </div>
        <div className="scroll-section w-full my-6" ref={bestSellersRef}>
          <div className='relative mx-auto'>
            <Title>Best Sellers</Title>
            <ProductCarousel saleTypeId={2} />
          </div>
        </div>
        <div className='scroll-section my-6' >
          <Title>About us</Title>
          <AboutUs />
        </div>
        <div className='scroll-section my-6' home={true}>
          <Testimonials />
        </div>
      </Suspense>

      {/* Render CTA and pass refs */}
      
    </div>
  );
};

export default MainPage;
