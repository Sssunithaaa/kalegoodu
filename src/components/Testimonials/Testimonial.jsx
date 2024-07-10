// src/components/Testimonial.js
import React from 'react';

const Testimonial = ({ text, name, username, avatar, logo }) => {
  return (
    <div className="bg-white p-6 m-5 rounded-lg shadow-md flex flex-col items-start space-y-4">
      <p className="text-gray-900">{text}</p>
      <div className="flex items-center space-x-4">
        {avatar && <img src={avatar} alt={`${name}'s avatar`} className="w-10 h-10 rounded-full"/>}
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-500">@{username}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
