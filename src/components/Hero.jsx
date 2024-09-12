import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { img12, img24 } from '../assets/images';
import { useNavigate } from 'react-router-dom';
import { FaAngleDoubleDown } from "react-icons/fa";
import { useStateContext } from '../context/ContextProvider';
// Keyframes for slide animation
const slide = keyframes`
  0% { transform: translateX(0); }
  33% { transform: translateX(0); }
  38% { transform: translateX(-100%); }
  71% { transform: translateX(-100%); }
  76% { transform: translateX(-200%); }
  100% { transform: translateX(-200%); }
`;

// Hero section styling
const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

// Image slider styling
const ImageSlider = styled.div`
  display: flex;
  position: absolute;
  width: ${({ imageCount }) => `${100 * imageCount}%`};
  animation: ${slide} 18s linear infinite;
`;

// Individual image wrapper styling using background image
const ImageWrapper = styled.div`
  flex: 1 0 100%;
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

// Hero component
const Hero = () => {
  const [images, setImages] = useState([img24]);  // Start with the static image
  const baseUrl = import.meta.env.VITE_APP_URL;
 
  // Fetch banner images from API
  const { data: banner, isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/banner_images/`);
      const data = await response.json();
      return data;
    }
  });

  useEffect(() => {
    if (banner?.banner_images) {
      const bannerImages = banner.banner_images.map(image => ({
        ...image,
        image: baseUrl + image.image // Concatenate base URL with image path
      }));
      setImages([img24, ...bannerImages]);  // Always keep the static image as the first image
    }
  }, [banner, baseUrl]);

  const navigate = useNavigate();

  return (
    <HeroSection>
      {isLoading ? (
        // Show placeholder if images are still loading
        <ImageWrapper src={img24} placeholder={img12} loaded={true} />
      ) : (
        <ImageSlider imageCount={images.length}>
          {/* Map over images to create LazyImage components */}
          {images.map((img, index) => (
            <LazyImage
              key={index}
              src={img.image || img}  // img.image for dynamic images, img for the static image
              placeholder="path/to/placeholder/image.jpg"
            />
          ))}
        </ImageSlider>
      )}
      {!isLoading && (
        <HeroContent>
          <HeroTitle>Transform Your Space</HeroTitle>
          <HeroSubtitle>Discover the best home decor ideas to beautify your home.</HeroSubtitle>
          <HeroButton onClick={() => navigate("/products")}>Shop Now</HeroButton>
        </HeroContent>
      )}
    </HeroSection>
  );
};

export default Hero;
