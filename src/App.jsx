import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
import ModalPage from './components/ModalPage';
import CheckOut from './components/CheckOut';
import AdminLayout from './admin/AdminLayout';
import Admin from './admin/Admin';
import Categories from './admin/screens/categories/Categories';
import EditCategories from './admin/screens/categories/EditCategories';
import ProductCarouselAdmin from './admin/screens/Carousel';
import MainLayout from './components/MainComponents/MainLayout';
const App = () => {
  return (
    <div>
       <MainLayout>
      <Routes>
       
        <Route path="/" element={<MainPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/:slug" element={<ProductPage/>}/>
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="products" element={<ProductCarouselAdmin />} />
          <Route path="categories/manage" element={<Categories />} />
          <Route path="categories/manage/edit/:slug" element={<EditCategories />} />
        </Route>
      
      </Routes>
        </MainLayout>
    </div>
  );
};

export default App;
