// import React, { createContext, useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query'; // Assuming useQuery is from react-query
// import { getAllProducts, getProductNames } from '../services/index/products';
//  import { toast } from "react-toastify";
// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
  

//   const [cartItems, setCartItems] = useState(() => {
//     const storedCartItems = localStorage.getItem('cartItems');
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });

//   const [isCartVisible, setIsCartVisible] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('upi');

//   const addToCart = (item,card) => {
 
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.product_id === item.product_id);
//       if (existingItem) {
//         return prevItems.map((i) =>
//           i.product_id === item.product_id ? { ...i, quantity: i.quantity } : i
//         );
//       } else {
//         return [...prevItems, { ...item, quantity: item.quantity == 0 ? 1 : item.quantity }];
//       }
//     });
//   };

//    const {data:products,isLoading} = useQuery({
//       queryKey: ["testimonial-products"],
//       queryFn: getProductNames
//     })
// const checkItems = () => {
//   if (!products || isLoading) return; // Exit if products are not loaded yet

//   if (Array.isArray(products) && cartItems.length > 0) {
//     const validCartItems = cartItems
//       .map((cartItem) => {
//         const product = products.find((p) => p.product_id === cartItem.product_id);
        
//         if (product) {
//           cartItem.availableQuantity = Math.min(cartItem.availableQuantity, product.quantity);
//         }
//         return product ? cartItem : null; // Return null for non-matching products
//       })
//       .filter(Boolean); // Remove null values

//     console.log("Products:", products);
//     console.log("Valid Cart Items:", validCartItems);

//     if (JSON.stringify(validCartItems) !== JSON.stringify(cartItems)) {
//       setCartItems(validCartItems);
//       localStorage.setItem('cartItems', JSON.stringify(validCartItems));
//       window.location.reload();
//     }
//   }
// };


//    console.log(cartItems)


//   useEffect(() => {
//  checkItems()
// }, [products]);


//   const increaseQuantity = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.product_id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQuantity = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.product_id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== id));
//   };

//   const emptyCart = () => {
//     setCartItems([]);
//   }

//   const toggleCart = () => {
//     setIsCartVisible(!isCartVisible);
//   };

//   const cartItemCount = cartItems.length;
//   const cartTotal = cartItems.reduce(
//     (acc, item) => acc + (item.discounted_price ? item.discounted_price * item.quantity : item.price * item.quantity),
//     0
//   );

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

 

// const validateCartQuantities = (cartItems) => {
//     return cartItems.reduce((updatedCart, item) => {
//         if (item.availableQuantity === 0) {
//             toast.warn(`Removed ${item.name} from the cart as it's out of stock.`);
//             return updatedCart; // Skip adding this item to the updated cart
//         }

//         if (item.quantity > item.availableQuantity) {
//             toast.warn(
//                 `Quantity of ${item.name} adjusted to available stock (${item.availableQuantity}).`
//             );
//             item = { ...item, quantity: item.availableQuantity }; // Adjust quantity
//         }

//         updatedCart.push(item);
//         return updatedCart;
//     }, []);
// };


//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         checkItems,
//         paymentMethod,
//         setPaymentMethod,
//         addToCart,
//         emptyCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         cartItemCount,
//         cartTotal,
//         isCartVisible,
//         setCartItems,
//         setIsCartVisible,
//         toggleCart,
//         loading,
//         setLoading,
//         validateCartQuantities
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductNames } from '../services/index/products';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [isCartVisible, setIsCartVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
   const cartItemCount = cartItems.length;
  const { data: products, isLoading } = useQuery({
    queryKey: ['testimonial-products'],
    queryFn: getProductNames,
    refetchOnWindowFocus: true,
  });

  const addToCart = (item, quantity) => {
    console.log(item);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.product_id === item.product_id);

      if (existingItem) {
        const newQuantity = Math.min(existingItem.cartQuantity + quantity, existingItem.availableQuantity);
        return prevItems.map((i) =>
          i.product_id === item.product_id ? { ...i, cartQuantity: newQuantity } : i
        );
      } else {
        return [
          ...prevItems,
          { 
            ...item, 
            availableQuantity: item.quantity, 
            cartQuantity: 1
          },
        ];
      }
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === id && item.cartQuantity < item.availableQuantity
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === id && item.cartQuantity > 1
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== id));
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + (item.discounted_price ? item.discounted_price * item.cartQuantity : item.price * item.cartQuantity),
    0
  );

  const validateCartQuantities = (cartItems) => {
    return cartItems.reduce((updatedCart, item) => {
      if (item.availableQuantity === 0) {
        toast.warn(`Removed ${item.name} from the cart as it's out of stock.`);
        return updatedCart;
      }

      if (item.cartQuantity > item.availableQuantity) {
        toast.warn(`Quantity of ${item.name} adjusted to available stock (${item.availableQuantity}).`);
        item = { ...item, cartQuantity: item.availableQuantity };
      }

      updatedCart.push(item);
      return updatedCart;
    }, []);
  };

  useEffect(() => {
    if (!products || isLoading) return;
    
    setCartItems((prevItems) =>
      prevItems.map((cartItem) => {
        const product = products.find((p) => p.product_id === cartItem.product_id);
        return product
          ? { ...cartItem, availableQuantity: product.quantity, cartQuantity: Math.min(cartItem.cartQuantity, product.quantity) }
          : cartItem;
      })
    );
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const checkItems = () => {
  if (!products || isLoading) return; // Exit if products are not loaded yet

  if (Array.isArray(products) && cartItems.length > 0) {
    const validCartItems = cartItems
      .map((cartItem) => {
        const product = products.find((p) => p.product_id === cartItem.product_id);
        
        if (product) {
          cartItem.availableQuantity = Math.min(cartItem.availableQuantity, product.quantity);
        }
        return product ? cartItem : null; // Return null for non-matching products
      })
      .filter(Boolean); // Remove null values

    console.log("Products:", products);
    console.log("Valid Cart Items:", validCartItems);

    if (JSON.stringify(validCartItems) !== JSON.stringify(cartItems)) {
      setCartItems(validCartItems);
      localStorage.setItem('cartItems', JSON.stringify(validCartItems));
      window.location.reload();
    }
  }
};
  useEffect(()=>{
    checkItems();
  },[])
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
        loading,
        setLoading,
        setCartItems,
        setIsCartVisible,
        toggleCart,
        validateCartQuantities,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
