import React from 'react';
import styled, { keyframes } from 'styled-components';
import { img21, img22, img23 } from '../assets/images'; // Import your images

const slide = keyframes`
  0% { transform: translateX(0); }
  33% { transform: translateX(0); }
  38% { transform: translateX(-100%); }
  71% { transform: translateX(-100%); }
  76% { transform: translateX(-200%); }
  100% { transform: translateX(-200%); }
`;

const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
  color: #fff;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    height: 90vh;
  }
`;

const ImageSlider = styled.div`
  display: flex;
  position: absolute;
  width: 300%;
  animation: ${slide} 18s linear infinite;
`;

const ImageWrapper = styled.div`
  flex: 1 0 100%;
  height: 100vh;
  background-size: contain; /* Or use 'contain' depending on your preference */
  background-position: center;
 
  @media (max-width: 768px) {
   max-height: 90vh;
    // padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  z-index: 1;

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeroButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  color: #fff;
  background-color: #ff6347; /* Customize your button color */
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

const Hero = () => {
  return (
    <HeroSection>
      <ImageSlider>
        <ImageWrapper style={{ backgroundImage: `url(${img21})` }} />
        <ImageWrapper style={{ backgroundImage: `url(${img22})` }} />
        <ImageWrapper style={{ backgroundImage: `url(${img23})` }} />
      </ImageSlider>
      <HeroContent>
        <HeroTitle>Transform Your Space</HeroTitle>
        <HeroSubtitle>Discover the best home decor ideas to beautify your home.</HeroSubtitle>
        <HeroButton href="#shop-now">Shop Now</HeroButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
