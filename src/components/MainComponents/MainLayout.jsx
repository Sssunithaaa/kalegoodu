import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import CTA from '../CTA';
import Breadcrumbs from '../BreadCrumbs';

const MainWrapper = styled.div`
  // background: rgb(192,230,109,0.1);
  // background: linear-gradient(90deg, rgba(192,230,109,0.5) 12%, rgba(236,244,135,0.5) 90%);
  // min-height: 100vh; /* Ensure it covers the full viewport height */
`;

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) {
    return <div>{children}</div>;
  }

  return (
    <div className='pt-[80px] md:pt-0'>
      <Navbar />
      {!isHomePage && <Breadcrumbs />}
      {children}
      <CTA />
    </div>
  );
};

export default MainLayout;
