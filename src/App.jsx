import React from 'react'
import {  Routes, Route } from "react-router-dom";
import MainPage from './components/MainPage';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
import ModalPage from './components/ModalPage';
import CheckOut from './components/CheckOut';
const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
                <Route path="/products" element={<Products/>}></Route>
               <Route path="/product/1" element={<ProductPage/>}></Route>
                                                            <Route path="/checkout" element={<CheckOut/>}></Route>

        </Routes>
    </div>
  )
}

export default App