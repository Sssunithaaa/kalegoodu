import React, { useState, useContext, useEffect } from 'react';
import Button from './Button';
import { CartContext } from '../context/CartContext';

const CustomerDetails = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [showSummary, setShowSummary] = useState(false); // Track order summary visibility

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fullAddress = `${apartment}, ${city}, ${state}, ${pincode}`;
    const customerData = {
      email,
      name: `${firstName} ${lastName}`,
      address: fullAddress,
    };
    console.log(customerData);
  };

  const { cartItems, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(cartTotal);

  useEffect(() => {
    let totalPrice = 0;
    cartItems?.forEach((item) => {
      totalPrice += item.discounted_price !== 0 ? item.discounted_price * item.quantity : item.price * item.quantity;
    });
    setTotal(totalPrice);
  }, [cartItems]);

  const baseUrl = import.meta.env.VITE_APP_URL;

  return (
     <div className=" flex flex-col justify-center items-center bg-white">
      <div className="container max-w-full justify-center  mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Mobile: Show Order Summary */}
        <div className="md:hidden w-full bg-[#edf3ed] p-4">
          <button 
            className="flex justify-between items-center w-full bg-white p-3 shadow-md rounded-md"
            onClick={() => setShowSummary(!showSummary)}
          >
            <span>Show Order Summary</span>
            <div className="flex items-center">
              <span className="font-bold">Rs. {total}</span>
              <span className="ml-2 transform transition-transform duration-300" style={{ transform: showSummary ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                ▼
              </span>
            </div>
          </button>
        </div>

       

        {/* Order Summary */}
        <div className={`bg-[#edf3ed] md:w-[50%] lg:col-span-1 lg:sticky lg:top-0 p-4   md:p-6 transition-all duration-300 lg:block ${showSummary ? 'block' : 'hidden'} `}>
          <table className="md:min-w-full min-w-full  justify-center divide-y divide-gray-500">
            <tbody className="divide-y max-w-[100%] divide-gray-300">
              {cartItems.length !== 0 && cartItems?.map((item) => (
                <tr className='px-2 md:px-0' key={item.product_id}>
                  <td className="py-3">
                    <div className="relative">
                      <img src={baseUrl + item.images[0]?.image} alt="" className="h-auto md:w-20 max-w-8 md:max-w-20 flex mx-auto" />
                      <span className="absolute top-0 left-[16px] bg-gray-300 text-black w-2 h-auto rounded-full text-xs flex items-center justify-center">{item.quantity}</span>
                    </div>
                  </td>
                  <td className="px-1 py-2 text-sm md:text-md">
                    <div className="flex flex-row gap-x-2 justify-between">
                      <span>{item.name}</span>
                      <span>Rs {item.discounted_price !== 0 ? item.discounted_price * item.quantity : item.price * item.quantity}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex md:px-3  mx-auto justify-between mt-4">
            <span>Shipping</span>
            <span>Free shipping</span>
          </div>
          <div className="flex md:px-3 mx-auto justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
        </div>
         {/* Customer Info Form */}
         <div className="bg-white md:w-[50%] justify-end p-3 md:p-6 lg:col-span-1 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Contact Information</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <h2 className="text-lg font-bold mb-4">Delivery</h2>

            <div className="flex space-x-4 mb-3">
              <div>
                <label className="block text-md font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-md font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className='mb-3'>
              <label className="block text-md font-medium text-gray-700">Apartment/Building</label>
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex space-x-4 mb-3">
              <div>
                <label className="block text-md font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-md font-medium text-gray-700">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className='mb-3'>
              <label className="block text-md font-medium text-gray-700">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full p-2 rounded"
            >
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
