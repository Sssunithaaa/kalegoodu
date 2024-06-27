import React, { useState } from 'react';
import ParallaxSection from './Parralax';
import Navbar from './Navbar';
const CheckOut = () => {
  const [paymentMethod, setPaymentMethod] = useState('bank');

  return (
    <div>
        <div className="fixed md:static mt-0 z-[100001] navbar w-full m-0">
        <Navbar />
      </div>
       <div className='lg:mt-5'><ParallaxSection/></div>
    <div className="max-w-2xl mx-auto p-4">
         
       
      <h1 className="text-2xl font-bold mt-4 ml-[8%]">Your Order</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between">
            <span>Feet Sculpture × 1</span>
            <span>€658</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Sculpture Artwork × 1</span>
            <span>€1200</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Subtotal</span>
          <span>€1858</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>Shipping</span>
          <span>Free shipping</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>€1858</span>
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
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg">Place order</button>
      </div>
    </div>
    </div>
  );
};

export default CheckOut;
