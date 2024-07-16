import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop triggered');
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0; // For most browsers
      document.body.scrollTop = 0; // For Safari
    }, 0);
  }, [pathname]);


};

export default ScrollToTop;
