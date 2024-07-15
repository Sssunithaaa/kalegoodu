// src/App.jsx
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import CardSlider from './CardSlider';
import ProductCarousel from './Slider';
import Categories from './Categories';
import ProductCard from './Card'; // Update import statement
import Title from './Title';
import ModalCard from './ModalCard';
import { img1,img2,img3,img14 } from '../assets/images';
import HomeDecor from './Description';
import Banner from './Banner';
import Testimonials from './Testimonials/Testimonials';
const MainPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(()=> {
    window.scrollTo(0,0);
  },[])
    const [products] = useState([
    { name: 'Product 1', price: '€658', rating: 4, description: 'Description for Product 1', img: img1 },
    { name: 'Product 2', price: '€758', rating: 5, description: 'Description for Product 2', img: img2 },
    { name: 'Product 3', price: '€858', rating: 3, description: 'Description for Product 3', img: img3 },
    // Add more products as needed
  ]);
  return (
    <div>
      {/* <div className="fixed md:static py-3 h-6 bg-orange my-auto flex w-screen container m-0 overflow-hidden justify-center items-center">
        <div className="whitespace-nowrap w-full animate-marquee text-center">
          This is a marquee text scrolling across the screen.
        </div>
      </div> */}

    
      <div className='w-full'>
        <Hero />
      </div>
       <div className='h-30 py-10'>
        <Title>Shop by collection</Title>
        <Categories />
      </div>
       <div className='w-full'>
        <Title>Trendiest new arrivals</Title>
        <ProductCarousel />
      </div>
    
    <div>
      <Banner/>
    </div>
     
    <div className='p-10'>
     <HomeDecor
    imageSrc={img14}
    heading="Beautiful Home Decor"
    description="Enhance your home with this exquisite flower pot, showcasing a blend of modern elegance and timeless beauty that complements any decor.."
  />
    </div>
     
      {/* <div className='w-full'>
        <Title>Featured Products</Title>
        <div className='flex flex-row justify-between container overflow-x-auto gap-x-4 my-10 mx-3 z-10 whitespace-nowrap'>
          <CardSlider />
          <CardSlider />
          <CardSlider />
        </div>
      </div>
      */}
      <div className='flex flex-col w-full justify-center items-center mx-auto px-10 gap-x-4 my-10  z-10'>
        <Title>Kitchen decor</Title>
        <div className='flex flex-wrap justify-center mt-[3%] gap-x-5 gap-y-10 items-center w-[100%]'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <div>
    
        <Testimonials/>
      </div>
      
    </div>
  );
};

export default MainPage;
