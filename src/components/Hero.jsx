import React from 'react';
import styled from 'styled-components';
import {hero,img10} from '../assets/images'

const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${img10});
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
  padding: 0 20px;
`;

const HeroContent = styled.div`
  max-width: 600px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
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
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <HeroTitle>Transform Your Space</HeroTitle>
        <HeroSubtitle>Discover the best home decor ideas to beautify your home.</HeroSubtitle>
        <HeroButton href="#shop-now">Shop Now</HeroButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
