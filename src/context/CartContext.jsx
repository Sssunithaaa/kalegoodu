import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming useQuery is from react-query
import { getAllProducts } from '../services/index/products';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { data: products, isLoading: pLoading, isFetching: pFetching } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

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

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== id));
  };

  const emptyCart = () => {
    setCartItems([]);
  }

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const cartItemCount = cartItems.length;
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + (item.discounted_price ? item.discounted_price * item.quantity : item.price * item.quantity),
    0
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Check if cart items exist in products data and update localStorage
  useEffect(() => {
    if (products && cartItems.length > 0) {
      const updatedCartItems = cartItems.filter((cartItem) =>
        products?.some((product) => product.product_id === cartItem.product_id)
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  }, [products]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        paymentMethod,
        setPaymentMethod,
        addToCart,
        emptyCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartItemCount,
        cartTotal,
        isCartVisible,
        setIsCartVisible,
        toggleCart,
        loading,
        setLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};