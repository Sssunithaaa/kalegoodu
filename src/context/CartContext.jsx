import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }
  const cartItemCount = cartItems.length;
  return (
    <CartContext.Provider value={{ cartItems, addToCart ,removeFromCart,cartItemCount}}>
      {children}
    </CartContext.Provider>
  );
};
