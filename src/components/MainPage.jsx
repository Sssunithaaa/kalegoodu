// src/App.jsx
import React, { useEffect, useState } from 'react';

import Hero from './Hero';

import ProductCarousel from './Slider';
import Categories from './Categories';

import Title from './Title';

import { img1, img2, img3, img14 } from '../assets/images';

import Testimonials from './Testimonials/Testimonials';
import AboutUs from './AboutUs';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  
  useEffect(() => {
    window.scrollTo(0, 20);
  }, []);

   const [products] = useState([
    { id: 1, name: 'Product-1', price: 1, rating: 4, description: 'Description for Product 1', img: img1 },
    { id: 2, name: 'Product-2', price: 758, rating: 5, description: 'Description for Product 2', img: img2 },
    { id: 3, name: 'Product-3', price: 858, rating: 3, description: 'Description for Product 3', img: img3 },
   

  ]);
  const navigate = useNavigate()

  return (
    <div>
      <div className="w-full">
        <Hero />
      </div>
      <div className="my-10">
        <Title>Shop by collection</Title>
        <Categories />
      </div>
      <div className="w-full my-10">
        <Title>Trendiest new arrivals</Title>
        <ProductCarousel products={products} />
      </div>
      <div className='my-6'>
        <Title>Best Sellers</Title>
        {/* <TiledCarousel /> Add the TiledCarousel component */}
         <ProductCarousel products={products} />
      </div>
       <div>
        <AboutUs />
      </div>
      <div className='my-6'>
        <Testimonials />
      </div>
     
      <div className='hover:cursor-pointer' onClick={()=> navigate("/admin")}>
        <Title >Admin</Title>
      </div>
    </div>
  );
};

export default MainPage;
