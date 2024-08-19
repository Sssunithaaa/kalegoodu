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
    <div className=''>
        <div  className="static py-4 marquee my-auto flex w-[100%] bg-gradient-to-r from-[#ECF487] via-green-50 to-[#C0E6CD] bg-opacity-5  m-0 overflow-hidden justify-center items-center">
        <div className="whitespace-nowrap w-full animate-marquee text-center">
          Flat 5% off on your first order, use code: FIRST5 | For express shipping, DM us.
        </div>
      </div>
      <Navbar />
      {!isHomePage && <Breadcrumbs />}
      <main className='flex-grow min-h-screen'>
        {children}
        </main>
      <CTA />
    </div>
  );
};

export default MainLayout;
