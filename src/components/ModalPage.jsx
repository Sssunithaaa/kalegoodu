import React, { useState } from 'react';
import Navbar from './Navbar';
import ModalCard from './ModalCard'; // Assuming these are the images
import { img1,img2,img3 } from '../assets/images';
const ModalPage = () => {
  const [products] = useState([
    { name: 'Product 1', price: '€658', rating: 4, description: 'Description for Product 1', img: img1 },
    { name: 'Product 2', price: '€758', rating: 5, description: 'Description for Product 2', img: img2 },
    { name: 'Product 3', price: '€858', rating: 3, description: 'Description for Product 3', img: img3 },
    // Add more products as needed
  ]);

  return (
    <div>
      <div className="fixed md:static mt-0 z-[100001] navbar w-full m-0">
        <Navbar />
      </div>
      <div className="font-kumbhsans md:max-w-[80%] md:mx-auto md:px-4 pt-[80px] lg:pt-0">
        <div className="flex flex-col md:flex-row md:px-0 md:gap-6 md:py-20 items-center md:justify-center lg:px-14 lg:gap-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {products.map((product, index) => (
              <ModalCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPage;
