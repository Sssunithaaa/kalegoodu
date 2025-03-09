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
  padding: 0;
  margin: 0;
  margin-left: 10px;
  font-family: 'Amiri', serif;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  margin-left: 2px;

  &:not(:last-child)::after {
    content: '>';
    margin: 0 0.5rem;
    color: #949494;
  }
`;

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: #949494;
  font-weight: semibold;
`;

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <BreadcrumbNav>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink to="/"><div className='text-black opacity-80 text-[16px] font-roboto md:text-[18px]'>
                Home</div></BreadcrumbLink>
        </BreadcrumbItem>

       {pathnames.map((value, index) => {
  let displayValue = decodeURIComponent(value).replace(/%20/g, '-');

  // Exclude standalone numbers (like 47)
  if (/^\d+$/.test(displayValue)) {
    return null;
  }

  // Remove trailing "-number" if it exists (like "Tea-Light-Holder-47" -> "Tea-Light-Holder")
  displayValue = displayValue.replace(/-\d+$/, '');

  const to = `/${pathnames.slice(0, index + 1).join('/')}`;

  return (
    <BreadcrumbItem key={index}>
      <BreadcrumbLink to={to}>
        <div className='text-black opacity-80 text-[16px] font-roboto md:text-[18px]'>
          {displayValue}
        </div>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
})}

      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

export default Breadcrumbs;