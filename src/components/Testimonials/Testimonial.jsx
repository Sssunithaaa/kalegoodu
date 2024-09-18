// src/components/Testimonial.js
import React from 'react';
import { FaStar } from 'react-icons/fa'; // For golden star ratings

const Testimonial = ({productMode, text,product_name, user_name,rating }) => {
  return (
    <div className={`${productMode ? "bg-green-100" : "bg-white"} testimonial p-5 m-4 rounded-lg shadow-md flex flex-col items-center space-y-4`}>
      <div>
          <h4 className=" text-md font-semibold">{product_name}</h4>
        </div>
      <p className="text-gray-900 text-md  ">{text}</p>
      <div className="flex flex-col items-center space-y-2">
        {/* {logo && <img src={logo} alt="Company logo" className="w-12 h-12 mb-2" />} */}
        {/* {!productMode && <div className="flex items-center space-x-1">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
        </div>} */}
        
        <div>
          <h4 className=" text-lg font-semibold">{user_name}</h4>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
