import React from 'react';
import styled from 'styled-components';
import { img19 } from '../assets/images';
const FoundersImage = styled.img`
  width: 350px;
  height: auto;
  object-fit: cover;
  margin: 1rem;
`;

const AboutUs = () => {
  return (
    <div className="about-us-container px-6 md:px-6">
      
      {/* <div className="about-us-section text-center mb-12">
        
        <p className="about-us-paragraph max-w-lg flex mx-auto text-md md:text-lg text-gray-700">
Welcome to Kalegoodu, your premier destination for all things home decor. We are passionate about helping you transform your living spaces into beautiful, functional, and comfortable environments that reflect your unique style and personality. 

At Kalegoodu, we are committed to providing you with the very best in home decor, focusing on three key pillars: quality, customer service, and uniqueness. Each product in our collection is meticulously crafted and curated to meet the highest standards of quality, ensuring that you receive only the finest items to adorn your home.


Thank you for choosing Kalegoodu as your trusted source for home decor. We are honored to be a part of your journey in creating a space that brings joy, comfort, and beauty to your everyday life.        </p>
      </div> */}
      <div className="founders-section my-2 flex flex-col md:flex-row gap-x-4 justify-center items-center text-center">
       
        <div className="founders-content md:w-[50%] flex flex-col px-4 md:flex-row justify-end items-center">
          <FoundersImage src={img19} alt="Founder 1" />
         
          
        </div>
         <div className="founder-description flex flex-col justify-start items-start text-lg px-2 md:w-[50%] md:text-lg text-gray-700 text-left  ">
            <h3 className="md:text-lg text-md font-bold mb-2">HELLO,<br/> From the Founders</h3>
<p className='text-md md:text-lg mx-w-lg'>
    "We believe that a home should be a true reflection of one's personality, a sanctuary where comfort and happiness abound, embracing both the little joys and the grand milestones of life.

As enthusiasts of home decor, our mission is to offer a wide array of thoughtfully designed products that inspire and make the process of decorating your home both enjoyable and effortless. Our collection spans across various styles and preferences, ensuring that every corner of your home can be a unique expression of your taste.

   </p></div>   </div>
    </div>
  );
}

export default AboutUs;
