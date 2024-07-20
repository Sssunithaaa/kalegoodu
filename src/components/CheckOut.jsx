import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from './Navbar';
import ParallaxSection from './Parralax';

const CheckOut = () => {
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const { cartItems, cartTotal } = useContext(CartContext);
  const [total, setTotal] = useState(cartTotal);

  // Calculate total price based on cart items
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
    message += `${item.name} × ${item.quantity}: $${item.price * item.quantity}\n`;
  });
  message += `\nTotal: $${total}\n\nPayment Method: ${paymentMethod}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
  console.log(whatsappLink)

  window.location.href = whatsappLink;
  
};


  return (
    <div>
     
      <div className='lg:mt-5'><ParallaxSection /></div>
      <div className="max-w-2xl mx-auto p-4">

        <h1 className="text-2xl font-bold mt-4 ml-[8%]">Your Order</h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="border-b pb-4 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex my-3 justify-between">
                <div className='flex flex-row items-center gap-x-3'>
                  <img src={item.img} alt="" className='h-16 w-auto' />
                  <span>{item.name} × {item.quantity}</span>
                </div>
                <span className='flex items-center'>₹ {item.price * item.quantity}</span>
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

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="bank"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={() => setPaymentMethod('bank')}
              className="mr-2"
            />
            <label htmlFor="bank" className="cursor-pointer">Direct bank transfer</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="check"
              name="paymentMethod"
              value="check"
              checked={paymentMethod === 'check'}
              onChange={() => setPaymentMethod('check')}
              className="mr-2"
            />
            <label htmlFor="check" className="cursor-pointer">Check payments</label>
          </div>
          <p className="text-gray-600">
            Make your payment directly into our bank account. Please use your Order ID as the payment reference.
            Your order will not be shipped until the funds have cleared in our account.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg"
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
