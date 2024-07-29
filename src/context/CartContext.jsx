import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the cart
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cartItems state with data from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [isCartVisible, setIsCartVisible] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Function to add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
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
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease item quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Function to remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to toggle cart visibility
  const toggleCart = () => {
    
    setIsCartVisible(!isCartVisible);
  };

  // Calculate total number of items in the cart
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate total price of items in the cart
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
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
