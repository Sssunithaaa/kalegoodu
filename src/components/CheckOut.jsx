import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomerDetailsModal from './CustomerDetails';
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
const Button = styled.button`
  width: 50%;
  height: 45px;
background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
  margin-top: 10px;
  border: none;
  cursor: pointer;
  display:flex;
  margin-inline:auto;
  justify-content:center;
  align-items:center;
  border-radius: 5px;

  &:hover {
    background-color: #9e7f6b; /* Slightly darker color */
  }
`;
const CheckOut = () => {
  const { cartItems, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(cartTotal);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [customerDetails, setCustomerDetails] = useState(null); 
  useEffect(() => {
    let totalPrice = 0;
    cartItems?.forEach((item) => {
      totalPrice += item.discounted_price !== 0 ? item.discounted_price * item.quantity : item.price * item.quantity;
    });
    setTotal(totalPrice);
  }, [cartItems]);
const baseUrl = import.meta.env.VITE_APP_URL
   const handlePlaceOrder = async () => {
    setIsModalOpen(true); // Open the modal when "Place Order" is clicked
  };

 const handleModalSubmit = async (details) => {
  setCustomerDetails(details);

  let message = 'Order Details:\n\n';
  cartItems.forEach((item) => {
    message += `${item.name} × ${item.quantity}: Rs. ${item.price * item.quantity}\n`;
  });
  message += `\nTotal: Rs. ${total}`;

  // Combine order details and customer details
  const orderPayload = {
    orderDetails: {
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.discounted_price !== 0 ? item.discounted_price : item.price
      })),
      total: total,
      count: cartItems.length
    },
    customerDetails: details,
  };
  console.log(orderPayload);

  try {
    // Using Promise.all to handle multiple requests concurrently
    const [orderResponse, messageResponse] = await Promise.all([
      axios.post(`${baseUrl}/api/create-order/`, orderPayload),
      axios.post(`${baseUrl}/api/send-message/`, { message }),  // Wrap message in an object if required by the API
    ]);

    console.log(orderResponse);
    console.log(messageResponse);
    toast.success("Order placed successfully!!")
  } catch (error) {
    console.log(error);
    toast.error("Couldn't place order")
  }
};

  const navigate = useNavigate();
  
  return (
    <div>
      <ToastContainer/>
     {cartItems.length === 0 ? <div className='flex flex-col h-full py-[50%] lg:py-20 justify-center mx-[10%] md:mx-[40%] items-center text-xl'><span>Your cart is empty</span><Button onClick={()=>navigate("/products")}>Start shopping</Button></div> :  <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl mt-4 font-bold ml-[8%]">Your Cart</h1>

        <div className="bg-white shadow-lg rounded-lg p-3 mb-2">
          <table className="min-w-full divide-y divide-gray-500">
 
  <tbody className="bg-white divide-y divide-gray-300">
    {cartItems.length !== 0 && cartItems?.map((item) => (
      <tr key={item.product_id}>
        <td className="mx-auto py-5 text-sm">
          <div className="">
            <img src={baseUrl + item.images[0]?.image} alt="" className="h-auto md:w-32 w-[80%] flex mx-auto" />
          </div>
        </td>
        <td className="px-3 py-5 text-sm">
         <div className=' flex flex-col gap-y-3 justify-start'>
           <div>
            <span className='uppercase'>{item.name}</span>
          </div>
            <div>
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.discounted_price !== 0 ? (
                              <>
                                <span className="line-through text-gray-500">
                                  Rs. {item.price}&nbsp;
                                </span>
                                <span className="text-red-600">
                                  {'  '}
                                  Rs. {item.discounted_price}
                                </span>
                              </>
                            ) : (
                              <>Rs. {item.price}</>
                            )}
                          </p>
                        </div>
          <div className="flex justify-start items-center gap-x-3">
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
          <div>
            <span>Rs {item.discounted_price !== 0 ? item.discounted_price * item.quantity : item.price* item.quantity}</span>
          </div>
         </div>
        </td>
       
        
        <td className="px-3 py-5 text-2xl">
          <button
            onClick={() => removeFromCart(item.product_id)}
            className="text-red-500"
          >
           &times; 
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
            <span>Rs.  {total}</span>
          </div>
          <Button
          onClick={handlePlaceOrder}
          className='w-[100%]'
        >
          Place Order
        </Button>
        </div>
      
        {/* Payment Method Selection */}
        
        
      </div>}
        <CustomerDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default CheckOut;
