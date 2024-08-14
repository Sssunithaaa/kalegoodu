import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the cart
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [isCartVisible, setIsCartVisible] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('upi');

  
  const addToCart = (item) => {
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.product_id === item.product_id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.product_id === item.product_id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Function to increase item quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease item quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Function to remove item from cart
  const removeFromCart = (id) => {
    console.log(id)
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== id));
  };

  // Function to toggle cart visibility
  const toggleCart = () => {
    
    setIsCartVisible(!isCartVisible);
  };

  // Calculate total number of items in the cart
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate total price of items in the cart
const cartTotal = cartItems.reduce(
  (acc, item) => acc + (item.discounted_price !== 0 ? item.discounted_price * item.quantity : item.price * item.quantity),
  0
);

  // useEffect to store cart items in localStorage whenever cartItems state changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        paymentMethod,
        setPaymentMethod,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartItemCount,
        cartTotal,
        isCartVisible,
        setIsCartVisible,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
