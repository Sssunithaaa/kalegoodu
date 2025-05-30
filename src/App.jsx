import React, { useContext,useEffect, Suspense,useState, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FullPageLoader from './components/FullPageLoader';
import { CartContext } from './context/CartContext';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authGuard } from './services/index/api';
const ManageSubCategories = lazy(()=> import('./admin/screens/categories/ManageSubCategories'))
const SubCategoryPage = lazy(()=> import('./admin/screens/categories/SubCategories'))
const ProductGallery = lazy(()=> import('./components/ProductCards/ProductGallery'))
const ManageText = lazy(()=> import('./admin/screens/details/ManageText'))
const EmailForm = lazy(()=> import('./admin/screens/emails/EmailForm'))
const OrderConfirmation = lazy(()=> import('./components/OrderConfirmation'))
const ScrollToTop = lazy(()=> import('./components/ScrollToTop'))
const MainPage = lazy(() => import('./components/MainPage'));
const Products = lazy(() => import('./components/Products'));
const ProductPage = lazy(() => import('./components/ProductCards/ProductPage'));
const CheckOut = lazy(() => import('./components/CheckOut'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const Admin = lazy(() => import('./admin/Admin'));
const Categories = lazy(() => import('./admin/screens/categories/Categories'));
const EditCategories = lazy(() => import('./admin/screens/categories/EditCategories'));
const MainLayout = lazy(() => import('./components/MainComponents/MainLayout'));
const ManagePosts = lazy(() => import('./admin/screens/posts/ManagePosts'));
const Banner = lazy(() => import('./admin/screens/Banner'));
const AboutUs = lazy(() => import('./components/details/AboutUs'));
const EditPost = lazy(() => import('./admin/screens/posts/EditPost'));
const ManageComments = lazy(() => import('./admin/screens/comments/ManageComments'));
const ManageSaleType = lazy(() => import('./admin/screens/saletypes/ManageSaleType'));
const AddTestimonialForm = lazy(() => import('./admin/screens/comments/AddComment'));
const ContactUs = lazy(() => import('./components/details/ContactUs'));
const TermsAndConditions = lazy(() => import('./components/details/TermsAndConditions'));
const Refund = lazy(() => import('./components/details/Refund'));
const Collections = lazy(() => import('./components/Collections'));
const ManageAboutUs = lazy(() => import('./admin/screens/details/AboutUs'));
const ManageDetails = lazy(() => import('./admin/screens/details/ManageDetails'));
const ManageOrders = lazy(() => import('./admin/screens/orders/ManageOrders'));
const CustomerDetails = lazy(() => import('./components/CustomerDetails'));
const WorkshopCarousel = lazy(() => import('./components/workshops/WorkshopCarousel'));
const AddWorkshop = lazy(() => import('./admin/screens/workshops/AddWorkshop'));
const ManageWorkshops = lazy(() => import('./admin/screens/workshops/ManageWorkshops'));
const DeliveryDetails = lazy(() => import('./components/details/DeliveryDetails'));
const WorkshopDetailsPage = lazy(() => import('./components/workshops/WorkshopDetails'));
const LoginForm = lazy(() => import('./components/login/LoginForm'));
const Hero = lazy(() => import('./components/components/Hero'));

const App = () => {
  const { loading } = useContext(CartContext);
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);

  const [authChecked, setAuthChecked] = useState(false);
 
  const navigate = useNavigate();
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    
    // Check authentication status when app loads
    const checkAuth = async () => {
      if (window.location.pathname.startsWith('/admin')) {
        try {
          await authGuard();
          console.log('Authenticated');
          setAuthChecked(true);
        } catch {
          navigate('/login');
        }
      } else {
        setAuthChecked(true);
      }
    };
    
    checkAuth();
  }, [navigate]);
  console.log('Auth checked:', authChecked);
  if (!authChecked && window.location.pathname.startsWith('/admin')) {
    return <FullPageLoader />;
  }
  return (
    <div>
      {/* ScrollToTop should be outside the Suspense component */}
    
      <Suspense fallback={<FullPageLoader />}>
        {loading && <FullPageLoader />}
          <ScrollToTop />
        <MainLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Hero" element={<Hero />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Products/:id" element={<Products />} />
            <Route path="/Products/:id/:name" element={<ProductGallery />} />
            <Route path="/Categories/:id/:name/" element={<Products />} />
            <Route path="/Categories/:slug" element={<Products />} />
            <Route path="/Categories" element={<Collections />} />
            <Route path="/Checkout" element={<CheckOut />} />
            <Route path="/Customer-details" element={<CustomerDetails />} />
            <Route path="/About-Us" element={<AboutUs />} />
            <Route path="/Workshops" element={<WorkshopCarousel />} />
            <Route path="/Workshops/:workshopId/:name" element={<WorkshopDetailsPage />} />
            <Route path="/Contact-Us" element={<ContactUs />} />
            <Route path="/Terms-and-Conditions" element={<TermsAndConditions />} />
            <Route path="/Returns-and-Refund" element={<Refund />} />
            <Route path="/Delivery-Details" element={<DeliveryDetails />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />

            <Route path="/login" element={<LoginForm />} />
      
            {isAuthenticated ? (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Admin />} />
    <Route path="sale-types/manage" element={<ManageSaleType />} />
    <Route path="comments/manage" element={<ManageComments />} />
    <Route path="comments/manage/edit/:id" element={<AddTestimonialForm />} />
    <Route path="comments/add" element={<AddTestimonialForm />} />
    <Route path="products/manage" element={<ManagePosts />} />
    <Route path="products/manage/edit/:id" element={<EditPost />} />
    <Route path="products/add" element={<EditPost />} />
    <Route path="banner" element={<Banner />} />
    <Route path="categories/manage" element={<Categories />} />
    <Route path="categories/manage/edit/:slug" element={<EditCategories />} />
    <Route path="categories/add" element={<EditCategories />} />
     <Route path="sub-categories/manage" element={<ManageSubCategories />} />
    <Route path="sub-categories/manage/:id" element={<SubCategoryPage />} />  {/* Manage subcategories by category ID */}
    <Route path="sub-categories/edit/:subcategoryId" element={<SubCategoryPage />} />  {/* Edit a specific subcategory */}
    <Route path="sub-categories/add" element={<SubCategoryPage />} />  {/* Add new subcategory */}

    <Route path="about-us/manage" element={<ManageAboutUs />} />
    <Route path="details/manage" element={<ManageDetails />} />
    <Route path="text/manage" element={<ManageText />} />
    <Route path="orders/manage" element={<ManageOrders />} />
    <Route path="workshops/manage" element={<ManageWorkshops />} />
    <Route path="workshops/add" element={<AddWorkshop />} />
    
    <Route path="workshops/manage/edit/:slug" element={<AddWorkshop />} />
    <Route path='send-emails' element={<EmailForm/>}/>

  </Route>
) : (
  <Route path="/admin" element={<Navigate to="/login" replace />} />
)}
<Route element={<div className="flex w-screen h-screen justify-center items-center">Page not found</div>}></Route>
          </Routes>
        </MainLayout>
      </Suspense>
    </div>
  );
};

export default App;
