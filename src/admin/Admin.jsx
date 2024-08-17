import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../components/Title';

const Admin = () => {
  return (
    <AdminContainer>
      <Title>Admin Dashboard</Title>
      <h1>Admin pages links</h1>
       <NavList>
        <NavItem><Link to="/admin/sale-types/manage">Manage Sale Types</Link></NavItem>
        <NavItem><Link to="/admin/comments/manage">Manage Comments</Link></NavItem>
        <NavItem><Link to="/admin/comments/add">Add Comment/Testimonial</Link></NavItem>
        <NavItem><Link to="/admin/products/manage">Manage Products</Link></NavItem>
        <NavItem><Link to="/admin/products/add">Add Product</Link></NavItem>
        <NavItem><Link to="/admin/banner">Manage Banners</Link></NavItem>
        <NavItem><Link to="/admin/categories/manage">Manage Categories</Link></NavItem>
        <NavItem><Link to="/admin/categories/add">Add Category</Link></NavItem>
        
      </NavList>
      <h1>Website navigation links</h1>
      <NavList>
        <NavItem><Link to="/">Go to Homepage</Link></NavItem>
        <NavItem><Link to="/Products">View Products</Link></NavItem>
        <NavItem><Link to="/Categories">View Categories</Link></NavItem>
        <NavItem><Link to="/Checkout">Checkout Page</Link></NavItem>
        <NavItem><Link to="/About-Us">About Us</Link></NavItem>
        <NavItem><Link to="/Contact-Us">Contact Us</Link></NavItem>
        <NavItem><Link to="/Terms-and-conditions">Terms and Conditions</Link></NavItem>
        <NavItem><Link to="/Returns-and-refund">Returns and Refund Policy</Link></NavItem>
      </NavList>
    </AdminContainer>
  );
};

export default Admin;

// Styled Components
const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 15px 0;
  
  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #0056b3;
    }
  }
`;
