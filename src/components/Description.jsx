import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: transparent;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 10px;
  }
`;

const DescriptionContainer = styled.div`
  flex: 1;
  padding: 50px;
  width: 40%;

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
  }
`;

const Heading = styled.h1`
  text-transform: uppercase;
  font-size: 2rem; /* Slightly larger font size */
  color: #000;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #000;
`;

const ImageContainer = styled.div`
  flex: 1;
  padding: 20px;
  width: 50%;

  @media (max-width: 768px) {
    padding: 10px;
    width: 100%;
  }
`;

const DecorImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0px;
`;
const Button = styled.button`
  width: 40%;
  height: 50px;
  background-color: #C0E6CD;
  margin-top: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #9e7f6b; /* Slightly darker color */
  }
`;

const HomeDecor = ({ imageSrc, heading, description }) => {
    const navigate = useNavigate()
  return (
    <Container>
      <DescriptionContainer>
        <Heading>{heading}</Heading>
        <Description>{description}</Description>
        <Button onClick={()=> navigate("/product/1")}>View More</Button>
      </DescriptionContainer>
      <ImageContainer>
        <DecorImage src={imageSrc} alt={heading} />
      </ImageContainer>
    </Container>
  );
};

export default HomeDecor;
