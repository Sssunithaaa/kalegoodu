import React from "react";
import styled from "styled-components";
import { img12 } from "../assets/images";

const Background = styled.div`
  background-image: url(${img12});
  background-size: cover;
  background-position: center;
  height: 400px; /* Adjust as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-align: center;
`;

const ColumnsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 800px; /* Adjust as needed */
  margin: 0 auto;
`;

const Column = styled.div`
  flex: 1;
  padding: 20px;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Count = styled.span`
  font-size: 36px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 16px;
`;

const Banner = () => (
  <Background>
    <ColumnsWrapper>
      <Column>
       
        <Count>100</Count>
        <Description>Delighted customers who love our services.</Description>
      </Column>
      <Column>
   
        <Count>200</Count>
        <Description>We offer a wide range of high-quality products.</Description>
      </Column>
      <Column>
        
        <Count>25</Count>
        <Description>Informative webinars to enhance your knowledge.</Description>
      </Column>
    </ColumnsWrapper>
  </Background>
);

export default Banner;
