import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
import CheckOut from './components/CheckOut';
import AdminLayout from './admin/AdminLayout';
import Admin from './admin/Admin';
import Categories from './admin/screens/categories/Categories';
import EditCategories from './admin/screens/categories/EditCategories';
import ProductCarouselAdmin from './admin/screens/Carousel';
import MainLayout from './components/MainComponents/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import ManagePosts from './admin/screens/posts/ManagePosts';
import Banner from './admin/screens/Banner';
import AboutUs from './components/AboutUs';

import EditPost from './admin/screens/posts/EditPost';
import ManageComments from './admin/screens/comments/ManageComments';
import ManageSaleType from './admin/screens/saletypes/ManageSaleType';
import AddTestimonialForm from './admin/screens/comments/AddComment';
import ContactUs from './components/ContactUs';
import TermsAndConditions from './components/TermsAndConditions';
import Refund from './components/Refund';

// Load your publishable key from your Stripe account
// const stripePromise = loadStripe('pk_test_51PgjE5RwCxv1rpup3UpDIrwhKCsnB6UelvyyG7LZmYTypWM5VOWd9I2oaKNw9GJPZABWMkk9y0AdGGxpwmdY0KtO00NsVFvc8d');
const App = () => {
  return (
    // <Elements stripe={stripePromise}>
      <div>
      <ScrollToTop />
      <MainLayout>
      <Routes>
        {/* Non-admin routes with MainLayout */}
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/products/:id/:name" element={<ProductPage />} />
          
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/About-Us" element={<AboutUs />} />
           <Route path="/Contact-Us" element={<ContactUs />} />
           <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
           <Route path="/returns-and-refund" element={<Refund />} />
        </Route>

        {/* Admin routes with AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path='sale-types/manage' element={<ManageSaleType/>}/>
          <Route path='comments/manage' element={<ManageComments/>}/>
          <Route path='comments/manage/edit/:id' element={<AddTestimonialForm/>}/>
            <Route path='comments/add' element={<AddTestimonialForm/>}/>
          <Route path="products/manage" element={<ManagePosts />} />
          <Route path="products/manage/edit/:id" element={<EditPost/>}/>
           <Route path="products/add" element={<EditPost/>}/>
          <Route path="banner" element={<Banner />} />
          <Route path="categories/manage" element={<Categories />} />
          <Route path="categories/manage/edit/:slug" element={<EditCategories />} />
          <Route path="categories/add" element={<EditCategories />} />
        </Route>
      </Routes>
      </MainLayout>
    </div>
    // </Elements>
  );
};

export default App;
