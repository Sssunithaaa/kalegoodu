// CheckOut.jsx
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from './Navbar';
import ParallaxSection from './Parralax';
import CheckoutForm from './CheckoutForm';

const CheckOut = () => {
 
  const { cartItems,paymentMethod,setPaymentMethod, cartTotal, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);
  const [total, setTotal] = useState(cartTotal);

  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotal(totalPrice);
  }, [cartItems]);

  const handlePlaceOrder = () => {
    const phoneNumber = '974692830'; // Replace with your WhatsApp number in international format
    let message = 'Order Details:\n\n';
    cartItems.forEach((item) => {
      message += `${item.name} × ${item.quantity}: ₹${item.price * item.quantity}\n`;
    });
    message += `\nTotal: ₹${total}\n\nPayment Method: ${paymentMethod}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
    console.log(whatsappLink);

    window.location.href = whatsappLink;
  };

  const handlePaymentSuccess = () => {
    console.log('Payment Successful!');
    // Perform actions after successful payment
    handlePlaceOrder();
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    
  };

  return (
    <div>
      <div className="lg:mt-5">
        <ParallaxSection />
      </div>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mt-4 ml-[8%]">Your Order</h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="border-b pb-4 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex my-3  justify-between items-center">
                <div className="flex flex-row items-center gap-x-3">
                  <img src={item.img} alt="" className="h-16  w-auto" />
                  <div className=' flex flex-col gap-x-5 ml-2 md:flex-row'>
                    <div><span>{item.name}</span></div>
                   <div className="flex items-center md:mt-0 mt-2 gap-x-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-300 text-black py-1 px-2 rounded-lg"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-300 text-black py-1 px-2 rounded-lg"
                  >
                    +
                  </button>
                </div>
                  </div>
                </div>
               
                <span className="flex items-center">₹ {item.price * item.quantity}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <span>Shipping</span>
            <span>Free shipping</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="card"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="card" className="mr-4">
              Credit/Debit Card
            </label>
            <input
              type="radio"
              id="upi"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="upi">
              UPI
            </label>
          </div>
        </div>

        <CheckoutForm
          totalAmount={total}
          onPaymentSuccess={handlePaymentSuccess}
          paymentMethod={paymentMethod}
        />
      </div>
    </div>
  );
};

export default CheckOut;
