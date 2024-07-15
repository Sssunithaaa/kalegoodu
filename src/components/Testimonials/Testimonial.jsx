// src/components/Testimonial.js
import React from 'react';
import { FaStar } from 'react-icons/fa'; // For golden star ratings

const Testimonial = ({ text, name, avatar, logo }) => {
  return (
    <div className="bg-white p-6 m-5 rounded-lg shadow-md flex flex-col items-center space-y-4">
      <p className="text-gray-900 text-lg font-serif">{text}</p>
      <div className="flex flex-col items-center space-y-2">
        {/* {logo && <img src={logo} alt="Company logo" className="w-12 h-12 mb-2" />} */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
        </div>
        <div>
          <h4 className="font-serif text-xl font-bold">{name}</h4>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
