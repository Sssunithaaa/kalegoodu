import React from 'react'
import {  Routes, Route } from "react-router-dom";
import MainPage from './components/MainPage';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
import ModalPage from './components/ModalPage';
const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
                <Route path="/products" element={<Products/>}></Route>
               <Route path="/product/1" element={<ProductPage/>}></Route>
                              <Route path="/product-page" element={<ModalPage/>}></Route>
        </Routes>
    </div>
  )
}

export default App