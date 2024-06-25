import React from 'react';
import './ProductCard.css'; // Import the CSS file
import { img1 } from '../assets/images';
const Card = () => {
  return (
    <div className="product-card">
      <div className="product-image h-full">
        <img src={img1} alt="Product" className='h-full w-full'/>
      </div>
      <div className="product-info">
        <p className="date">March 4, 2019</p>
        <h3 className="title">FARMHOUSE PLANTS</h3>
        <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et arcu sed ante elementum faucibus.</p>
        <a href="#" className="read-more">Read more</a>
      </div>
    </div>
  );
};

export default Card;
