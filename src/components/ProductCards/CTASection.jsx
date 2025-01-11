import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const Button = styled.button`
  width: 100%;
  height: 45px;
  background-image: radial-gradient(
    at 19.8% 35%,
    hsla(64.4, 83.2%, 74.3%, 1) 0%,
    hsla(64.4, 83.2%, 74.3%, 0) 100%
  ),
  radial-gradient(
    at 79.6% 29.8%,
    hsla(140.5, 43.2%, 82.7%, 1) 0%,
    hsla(140.5, 43.2%, 82.7%, 0) 100%
  ),
  radial-gradient(
    at 80.7% 71%,
    hsla(113.6, 77.2%, 62.2%, 1) 0%,
    hsla(113.6, 77.2%, 62.2%, 0) 100%
  );
  margin-top: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #9e7f6b;
  }
`;

export const CTASection = ({ product, cartCounter, setCartCounter }) => {
  const [productCounter, setProductCounter] = useState(1);
  const { addToCart, setIsCartVisible, setLoading } = useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState("");

  const addProduct = () => {
    setProductCounter((prev) => prev + 1);
  };

  const removeProduct = () => {
    setProductCounter((prev) => (prev > 1 ? prev - 1 : 1));
    setErrorMessage(""); // Clear error if quantity is decreased
  };

  const handleAddToCart = () => {
    const productDetails = {
      ...product,
      availableQuantity: product?.quantity,
      quantity: productCounter === 0 ? 1 : productCounter,
    };

    // Add the product to the cart
    addToCart(productDetails);

    // Update cart counter
    setCartCounter((prev) => prev + productCounter);

    // Reset product counter
    setProductCounter(1);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setTimeout(() => {
      setIsCartVisible(true);
    }, 1000);
  };

  const handleIncreaseQuantity = () => {
    if (productCounter < product.quantity) {
      setProductCounter((prev) => prev + 1);
      setErrorMessage(""); // Clear any previous error
    } else {
      setErrorMessage("Requested quantity exceeds available stock.");
    }
  };

  return (
    <div className="flex flex-col justify-center w-[100%] items-center px-4 gap-x-4 lg:flex-row">
      {/* Error Message */}
      {errorMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[10001] bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage("")}
            className="ml-4 text-red-500"
          >
            <IoClose />
          </button>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex w-full bg-gray-50 justify-between items-center px-6 py-2 rounded-xl md:w-1/4 md:mt-0">
        {/* Minus Button */}
        <div>
          <button
            onClick={removeProduct}
            className="font-bold text-gray-700 text-2xl pb-1"
          >
            -
          </button>
        </div>

        {/* Quantity */}
        <div className="font-bold">{productCounter}</div>

        {/* Plus Button */}
        <div>
          <button
            onClick={handleIncreaseQuantity}
            className="font-bold text-gray-700 text-2xl w-[1rem] pb-1"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="md:w-3/4 py-2 w-[100%]">
        <Button onClick={handleAddToCart} className="py-2">
          <div className="w-[100%] flex gap-4 justify-center">Add to cart</div>
        </Button>
      </div>
    </div>
  );
};
