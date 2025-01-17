import React, { useEffect, Suspense, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Title from './Title';
import { useQuery } from '@tanstack/react-query';
import FullPageLoader from './FullPageLoader';
import { useStateContext } from '../context/ContextProvider';
import ScrollToTop from './ScrollToTop';
import axios from 'axios';

const ProductCarousel = React.lazy(() => import('./Slider'));
const Categories = React.lazy(() => import('./Categories'));
const Testimonials = React.lazy(() => import('./Testimonials/Testimonials'));
const AboutUs = React.lazy(() => import('./AboutUs'));

const MainPage = () => {
  const baseUrl = import.meta.env.VITE_APP_URL;

  const { marqueeRef, heroRef, categoriesRef, newArrivalsRef, bestSellersRef } = useStateContext();
  const location = useLocation();

  const { data: saleTypes, isLoading, refetch } = useQuery({
    queryKey: ["saletypes"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/sale_types/`);
        return response.data?.sale_types;
      } catch (error) {
        console.log('Error fetching sale types:', error);
      }
    },
  });

  // Filter sale types based on 'visible' field using useMemo
  const visibleSaleTypes = useMemo(() => {
    return saleTypes?.filter((saleType) => saleType.visible); // Only include visible sale types
  }, [saleTypes]);

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
          <Title>Shop By Category</Title>
          <Categories />
        </div>
        {
          // Dynamically render visible sale types
          visibleSaleTypes?.map((saleType) => (
            <div className="scroll-section w-full my-6" key={saleType.sale_type_id} ref={saleType?.name === "Best Sellers" ? bestSellersRef : saleType?.name === "New Arrivals" ? newArrivalsRef : null}>
              <div className='relative mx-auto'>
                <Title>{saleType?.name}</Title>
                <ProductCarousel saleTypeId={saleType?.sale_type_id} />
              </div>
            </div>
          ))
        }

        <div className='scroll-section my-6'>
          <Title>About Us</Title>
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
