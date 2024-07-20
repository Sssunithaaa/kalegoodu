// Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbNav = styled.nav`
  padding: 1rem;
  background-color: #ffffff;
`;

const BreadcrumbList = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: row;
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
      
          <div className='text-black lg:mt-0  opacity-80 text-[16px] font-roboto md:text-[16px] mr-[8px]' to="/"><Link to="/">Home&nbsp;&nbsp;&nbsp;&nbsp;&gt;&nbsp; </Link></div>
   
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <div key={index} className="text-black opacity-80 text-[16px] font-roboto md:text-[16px]">
          <Link to={to}>{value}</Link>
          {index !== pathnames.length - 1 && <span className="px-3">&gt;</span>}
        </div>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

export default Breadcrumbs;
