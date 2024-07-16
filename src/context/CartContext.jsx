import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible,setIsCartVisible] = useState(false);
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }
  const toggleCart = () => {
    console.log("Hii")
    setIsCartVisible(!isCartVisible);
  }
  const cartItemCount = cartItems.length;
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price,0);
  return (
    <CartContext.Provider value={{ cartItems, addToCart ,removeFromCart,cartItemCount,cartTotal,isCartVisible,setIsCartVisible,toggleCart}}>
      {children}
    </CartContext.Provider>
  );
};
