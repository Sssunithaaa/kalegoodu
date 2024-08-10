import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Navbar from './Navbar';
import ParallaxSection from './Parralax';

const CheckOut = () => {
  const { cartItems, paymentMethod, setPaymentMethod, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(cartTotal);

  useEffect(() => {
    let totalPrice = 0;
    cartItems?.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotal(totalPrice);
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    let message = 'Order Details:\n\n';
    cartItems.forEach((item) => {
      message += `${item.name} × ${item.quantity}: ₹${item.price * item.quantity}\n`;
    });
    message += `\nTotal: ₹${total}\n\nPayment Method: ${paymentMethod}`;
    
    try {
      const response = await fetch('http://localhost:3000/send-order', { // Ensure correct URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        console.log('Order sent successfully!');
        // Perform actions after successful order placement
      } else {
        console.error('Failed to send order');
      }
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const baseUrl = import.meta.env.VITE_APP_URL
  return (
    <div>
      <div className="lg:mt-5">
        <ParallaxSection />
      </div>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mt-4 ml-[8%]">Your Order</h1>

        <div className="bg-white shadow-md rounded-lg p-3 mb-6">
          <table className="min-w-full divide-y divide-gray-200">
  {/* <thead className="bg-gray-50">
    <tr>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
    </tr>
  </thead> */}
  <tbody className="bg-white divide-y divide-gray-200">
    {cartItems?.map((item) => (
      <tr key={item.product_id}>
        <td className="px-3 py-5 text-sm">
          <div className="flex items-center gap-x-3">
            <img src={baseUrl + item.images[0]?.image} alt="" className="h-20 w-auto" />
          </div>
        </td>
        <td className="px-3 py-5 text-sm">
          <span>{item.name}</span>
        </td>
        <td className="px-3 py-5 text-sm">
          <div className="flex justify-center items-center gap-x-3">
            <button
              onClick={() => decreaseQuantity(item.product_id)}
              className="bg-gray-300 text-black py-1 px-2 rounded-lg"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => increaseQuantity(item.product_id)}
              className="bg-gray-300 text-black py-1 px-2 rounded-lg"
            >
              +
            </button>
          </div>
        </td>
        <td className="px-1 py-5 text-sm">
          <span>₹ {item.price * item.quantity}</span>
        </td>
        <td className="px-3 py-5 text-sm">
          <button
            onClick={() => removeFromCart(item.product_id)}
            className="text-red-500"
          >
            Remove
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


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

        <button
          onClick={handlePlaceOrder}
          className="bg-yellow-500 text-white py-2 px-4 rounded-lg mt-4"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
