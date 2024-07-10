import React from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar';
import CTA from '../CTA';

const MainWrapper = styled.div`
  // background: rgb(192,230,109,0.1);
  // background: linear-gradient(90deg, rgba(192,230,109,0.5) 12%, rgba(236,244,135,0.5) 90%);
  // min-height: 100vh; /* Ensure it covers the full viewport height */
`;

const MainLayout = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-[#ECF487] via-green-50 to-[#C0E6CD]">
      <Navbar />
      {children}
      <CTA />
    </div>
  );
};

export default MainLayout;
