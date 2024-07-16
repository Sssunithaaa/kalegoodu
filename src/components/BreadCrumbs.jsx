// Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbNav = styled.nav`
  padding: 1rem;
  background-color: #f8f9fa;
`;

const BreadcrumbList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left:10px;
  font-family:  'Amiri', serif;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
 margin-left:2px;
  &:not(:last-child)::after {
    content: '>';
    margin: 0 0.5rem;
    color: #949494;
  }
`;

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: #949494;
  font-weight: bold;

 
`;

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <BreadcrumbNav>
      <BreadcrumbList>
      
          <div className='text-black opacity-50 text-[16px] font-roboto md:text-[16px] mr-[8px]' to="/"><Link to="/">Home&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp; </Link></div>
   
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <div key={index} className="text-black opacity-50 text-[16px] font-roboto md:text-[16px]">
          <Link to={to}>{value}</Link>
          {index !== pathnames.length - 1 && <span className="px-3">/</span>}
        </div>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

export default Breadcrumbs;
