import React, { useState } from 'react';
import Sidebar from './SideBar';
import { ProductCard } from './ProductCard';
import Navbar from './Navbar';
import { img1, img11, img2, img3 } from '../assets/images';
const Products = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const images = [img1,img2,img3]

  return (
    <div className='w-screen'> 
    <div className="fixed md:static z-[100001] navbar w-full m-0">
        <Navbar />
      </div>
      <div
      className='w-full h-[500px] text-center'
      style={{
        backgroundImage: `url(${img11})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
     <div className='flex h-full font-semibold text-pink-700 text-[27px] w-full justify-center items-center'> SHOP NOW</div>
    </div>
    <div className="flex flex-col lg:mx-[160px] relative">
    
      <div className='h-[120px] p-10'>
        <h1 className='text-[30px] font-semibold'>Home decor</h1>
      </div>
      <div className='flex lg:flex-row flex-col'>
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${showSidebar ? 'block' : 'hidden'}`} onClick={toggleSidebar}></div>
        <div className={`fixed bg-white inset-y-0 left-0 z-50 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64`}>
          <Sidebar />
        </div>
       <div className="flex-1 p-4 ">
  <h1 className="text-2xl font-bold mb-4 ml-[5%]">Products</h1>
  <div className="flex justify-center items-center mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((product, index) => (
        <ProductCard key={index} img={product} />
      ))}
      {/* Add more ProductCard components as needed */}
    </div>
  </div>
</div>


      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around border-t border-gray-300 z-50">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => alert('Sort By clicked')}>Sort By</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleSidebar}>Filter</button>
      </div>
    </div>
    </div>
  );
};

export default Products;
