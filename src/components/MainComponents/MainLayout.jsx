import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import CTA from '../CTA';
import Breadcrumbs from '../BreadCrumbs';
import Marquee from "react-fast-marquee";
import { useStateContext } from '../../context/ContextProvider';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) {
    return <div>{children}</div>;
  }
 const {marqueeRef,showSidebar} = useStateContext()

 useEffect(() => {
   const params = new URLSearchParams(location.search);
    const section = params.get("section");
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0; 
      document.body.scrollTop = 0; 
     if (section !== "newArrivals" && marqueeRef && marqueeRef.current) {
     marqueeRef.current.scrollIntoView({ behavior: 'smooth' });
   }
    }, 0);
  }, [location.pathname]);
   const message = "Flat 5% off on your first order, use code: FIRST5 | For express shipping, DM us.";
const spacing = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"; // Adds extra non-breaking spaces
  return (
    <div className='example'>
      <div 
  ref={marqueeRef} 
  className="static py-2 overflow-hidden w-full z-10  bg-gradient-to-r from-[#ECF487] via-green-50 to-[#C0E6CD] bg-opacity-5"
  style={{ position: 'relative',zIndex:10 }}
>
  {!showSidebar && <Marquee speed={100} style={{zIndex:1}} gradient={false}>
    {message}{spacing}{spacing}{spacing}{spacing}{spacing}{spacing}{message}
  </Marquee>}
</div>

      <Navbar />
      {!isHomePage && <Breadcrumbs />}
      <main className='h-[100%] min-h-screen flex-grow'>
        {children}
      </main>
    {<CTA/>}
    </div>
  );
};

export default MainLayout;
