import React from 'react';
import CardSlider from './CardSlider';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
`;

const Images = () => {
  return (
    <GridContainer>
      <CardSlider />
      <CardSlider />
      <CardSlider />
    </GridContainer>
  );
}

export default Images;
