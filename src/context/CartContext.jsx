import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming useQuery is from react-query
import { getAllProducts, getProductNames } from '../services/index/products';
 import { toast } from "react-toastify";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [isCartVisible, setIsCartVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const addToCart = (item,card) => {
 
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.product_id === item.product_id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.product_id === item.product_id ? { ...i, quantity: i.quantity } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: item.quantity == 0 ? 1 : item.quantity }];
      }
    });
  };

   const {data:products,isLoading} = useQuery({
      queryKey: ["testimonial-products"],
      queryFn: getProductNames
    })
const checkItems = () => {
  if (Array.isArray(products) && cartItems.length > 0) {
    const validCartItems = cartItems
      .map((cartItem) => {
        // Find the corresponding product based on product_id
        const product = products.find((product) => product.product_id === cartItem.product_id);
        if (product) {
          // Adjust the cartItem's quantity based on available stock
          cartItem.availableQuantity = Math.min(cartItem.availableQuantity, product.quantity);
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.availableQuantity > 0); // Remove items with 0 quantity

    // If there are changes in the cart items, update the state and local storage
    if (JSON.stringify(validCartItems) !== JSON.stringify(cartItems)) {
      setCartItems(validCartItems);
      localStorage.setItem('cartItems', JSON.stringify(validCartItems));
      window.location.reload(); // Reload the page if there are changes
    }
    return;
  }
};


  useEffect(() => {
 checkItems()
}, [products]);


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

 

const validateCartQuantities = (cartItems) => {
    return cartItems.reduce((updatedCart, item) => {
        if (item.availableQuantity === 0) {
            toast.warn(`Removed ${item.name} from the cart as it's out of stock.`);
            return updatedCart; // Skip adding this item to the updated cart
        }

        if (item.quantity > item.availableQuantity) {
            toast.warn(
                `Quantity of ${item.name} adjusted to available stock (${item.availableQuantity}).`
            );
            item = { ...item, quantity: item.availableQuantity }; // Adjust quantity
        }

        updatedCart.push(item);
        return updatedCart;
    }, []);
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        checkItems,
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
        setCartItems,
        setIsCartVisible,
        toggleCart,
        loading,
        setLoading,
        validateCartQuantities
      }}
    >
      {children}
    </CartContext.Provider>
  );
};