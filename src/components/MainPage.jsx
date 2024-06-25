// src/App.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import CardSlider from './CardSlider';
import ProductCarousel from './Slider';
import Categories from './Categories';
import ProductCard from './Card'; // Update import statement
import Title from './Title';
import ModalPage from './ModalPage';

const MainPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div>
      {/* <div className="fixed md:static py-3 h-6 bg-orange my-auto flex w-screen container m-0 overflow-hidden justify-center items-center">
        <div className="whitespace-nowrap w-full animate-marquee text-center">
          This is a marquee text scrolling across the screen.
        </div>
      </div> */}

      <div className="fixed md:static mt-0 z-[100001] navbar w-full m-0">
        <Navbar />
      </div>
      <div className='w-full'>
        <Hero />
      </div>
      <div className='h-30 py-10'>
        <Title>Categories</Title>
        <Categories />
      </div>
      <div className='w-full'>
        <Title>Featured Products</Title>
        <div className='flex flex-row justify-between container overflow-x-auto gap-x-4 my-10 mx-3 z-10 whitespace-nowrap'>
          <CardSlider />
          <CardSlider />
          <CardSlider />
        </div>
      </div>
      <div className='w-full'>
        <Title>Product Carousel</Title>
        <ProductCarousel />
      </div>
      <div className='flex flex-col w-full justify-center items-center mx-auto px-10 gap-x-4 my-10  z-10'>
        <Title>Product Cards</Title>
        <div className='flex flex-wrap justify-center gap-x-5 gap-y-10 items-center w-[100%]'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      
    </div>
  );
};

export default MainPage;
