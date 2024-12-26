import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { first, img12, img24 } from '../assets/images';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

// Hero section styling
const HeroSection = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  height: calc(95vh - var(--navbar-height) - var(--marquee-height));
  overflow: hidden;
  position: relative;
  color: #fff;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    height: calc(88vh - var(--navbar-height-mobile) - var(--marquee-height-mobile));
  }
`;

// Individual image wrapper styling using background image
const ImageWrapper = styled.div`
  height: 90vh;
  background-size: contain;
  background-position: center;
  background-image: ${({ loaded, src, placeholder }) => (loaded ? `url(${src})` : `url(${placeholder})`)};
  filter: ${({ loaded }) => (loaded ? 'none' : 'blur(5px)')};
  transition: filter 0.3s ease;
  background-attachment: fixed;
  @media (max-width: 768px) {
    max-height: 85vh;
  }
`;

// Content styling for hero section
const HeroContent = styled.div`
  max-width: 600px;
  z-index: 1;

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

// Title styling
const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Subtitle styling
const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

// Button styling
const HeroButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  color: #fff;
  background-color: #ff6347;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4500;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
`;

// LazyImage component for lazy loading with placeholder
const LazyImage = ({ src, placeholder, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <ImageWrapper
      src={src}
      placeholder={placeholder}
      loaded={loaded}
      {...props}
    />
  );
};
const Hero = () => {
  const [images, setImages] = useState([img24]);  // Start with the static image
  const baseUrl = import.meta.env.VITE_APP_URL;
  const { data: banner, isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/banner_images/`);
   
      const data = await response.json();
    
      return data;
    }
  });

  const navigate = useNavigate();

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  return (
    <HeroSection>
      {isLoading ? (
        <ImageWrapper>
          <img src={first} alt="Placeholder" />
        </ImageWrapper>
      ) : (
        <Slider {...settings}>
          {banner?.test_products?.map((img, index) => (
            <ImageWrapper key={index}>
              <img src={img.image || img} alt={`Slide ${index + 1}`} />
            </ImageWrapper>
          ))}
        </Slider>
      )}
      {!isLoading && (
        <HeroContent>
          <h1>Transform Your Space</h1>
          <p>Discover the best home decor ideas to beautify your home.</p>
          <HeroButton onClick={() => navigate("/products")}>Shop Now</HeroButton>
        </HeroContent>
      )}
    </HeroSection>
  );
};

export default Hero;