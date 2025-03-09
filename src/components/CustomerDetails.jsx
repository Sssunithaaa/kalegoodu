import React, { useState, useContext, useEffect } from 'react';
import Button from './Button';
import { CartContext } from '../context/CartContext';
import axios from 'axios'; // Import axios for making backend requests
import { toast, ToastContainer } from 'react-toastify'; // For showing success/error messages
import OrderConfirmation from './OrderConfirmation';
import { useNavigate } from 'react-router-dom';
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import FullPageLoader from './FullPageLoader';
import { Spinner } from '@material-tailwind/react';
import { ClipLoader } from 'react-spinners';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/index/products';
import api from '../services/index/api';

const CustomerDetails = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [add,setAdd] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [customer, setCustomer] = useState([])
  const navigate = useNavigate()
  const { cartItems,setCartItems, cartTotal,emptyCart,checkItems,removeFromCart,validateCartQuantities } = useContext(CartContext);
  const [total, setTotal] = useState(cartTotal);
  const [dialogOpen, setDialogOpen] = useState(false);
  // const { error, isLoading, Razorpay } = useRazorpay();
  
useEffect(() => {
  let totalPrice = 0;
  cartItems?.forEach((item) => {
    if (item.availableQuantity > 0) {  // Ensure item is in stock
      totalPrice += item.discounted_price !== 0 
        ? item.discounted_price * item.cartQuantity 
        : item.price * item.cartQuantity;
    }
  });
  setTotal(totalPrice);
}, [cartItems]);
  console.log(total)
  const baseUrl = import.meta.env.VITE_APP_URL;
  


const [loading,setIsLoading] = useState(false)

const [orderLoading, setIsOrderLoading] = useState(false);



const handleCartUpdate = () => {
    const updatedCart = validateCartQuantities(cartItems);
    setCartItems(updatedCart);
    // window.location.reload();
  };


const validateStockMutation = useMutation({
  mutationFn: async (cartItems) => {
    const response = await axios.post(`${baseUrl}/api/validate-stock/`, { cartItems });
    return response.data;
  }
});

const handleFormSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  checkItems();
  handleCartUpdate()
  const { valid, outOfStockItems } = await validateStockMutation.mutateAsync(cartItems);

    if (!valid) {
      toast.error(`These items are out of stock: ${outOfStockItems.join(', ')}`);
      return;
    } 
  // Prepare customer and order payload
  const formattedPhone = phone.startsWith("0") ? phone.slice(1) : phone;
  const fullAddress = `${apartment}, ${add}, ${city}, ${state}`;
  const customerDetails = {
    email,
    name: `${firstName} ${lastName}`,
    address: fullAddress,
    phone_number: "91" + formattedPhone,
    pincode,
    visible: "True",
  };

  const orderPayload = {
    orderDetails: {
      items: cartItems.map((item) => ({
        name: item.name,
        product_id: item.product_id,
        quantity: item.cartQuantity,
        price: item.discounted_price !== 0 ? item.discounted_price : item.price,
        image: item.images[0].image,
      })),
      total: total,
      count: cartItems.length,
    },
    customerDetails,
  };

  setCustomer(orderPayload);
  
  try {
    // Create Razorpay order
    const response = await axios.post(`${baseUrl}/api/create-payment/`, { amount: 100 }, {
      headers: { "Content-Type": "application/json" },
    });

    const { razorpay_order_id, amount, currency } = response.data;
   
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency,
      name: "Kalegoodu",
      description: "Order Payment",
      order_id: razorpay_order_id,
      handler: async function (paymentResponse) {
  try {
    // Verify payment
    const verificationResponse = await axios.post(`${baseUrl}/api/verify-payment/`, paymentResponse);

    if (verificationResponse.data.status === "success") {
      
      setIsOrderLoading(true); // Show loader during backend processing

      // Attempt to create order in the backend
      try {
        const res = await axios.post(`${baseUrl}/api/create-order/`, orderPayload);
     
        toast.success("Order placed successfully!");
        emptyCart();

        // Navigate to Order Confirmation page with order details
        setTimeout(() => {
          navigate("/Order-Confirmation", { state: { orderPayload } });
        }, 2000);

      } catch (orderError) {
        // Handle order creation failure
        console.log("Order creation failed:", orderError);

        toast.error(
          "Order placement failed after successful payment. " +
          "If the amount was deducted, please contact us at kalegoodu@gmail.com with your payment details."
        , { autoClose: false });
      }
    } else {
      toast.error("Payment verification failed!");
    }
  } catch (error) {
    console.error("Payment verification or order creation failed:", error);
    toast.error("Error processing payment or placing order.");
  } finally {
    setIsOrderLoading(false); // Stop loader
    setIsLoading(false)
  }
},

      prefill: {
        name: `${firstName} ${lastName}`,
        email,
        contact: `+91${phone}`,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.log("Payment initiation failed:", error);
    toast.error("Payment initiation failed! Please try again.");
  } finally {
    setIsLoading(false);
  }
};
 const updateQuantity = (productId, quantity) => {
  setCartItems(prevItems =>
    prevItems.map(item => 
      item.product_id === productId 
        ? { ...item, cartQuantity: quantity } 
        : item
    )
  );
};


// useEffect(()=>{
//   checkItems()
// },[])



 
  return (
    <div className=" flex flex-col mx-auto justify-center items-center bg-white">
      {/* {orderLoading && <div className='w-screen h-screen flex justify-center items-center'><ClipLoader size={20}/></div>} */}
      {orderLoading && <FullPageLoader />}
      {/* <OrderConfirmation open={dialogOpen} handleClose={handleCloseDialog} customer={customer}/> */}
      <div className="container max-w-full justify-center grid grid-cols-1 lg:grid-cols-2">
        {/* Mobile: Show Order Summary */}
        <ToastContainer/>
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
        
{/*bg-[#edf3ed]  */}
        {/* Order Summary */}
     <div className={`bg-gray-50 w-[100%] md:w-[50%] md:max-w-[50%] md:col-span-1 md:sticky md:top-0 px-4 pb-4 md:pb-6 transition-all duration-300 md:block ${showSummary ? 'block' : 'hidden'}`}>
  {/* <table className="md:min-w-full table-fixed md:px-3 min-w-full justify-center divide-y divide-gray-500"> */}
  {/* <tbody className="divide-y max-w-[100%] divide-gray-300"> */}
 <div className='text-lg md:text-2xl text-center font-bold my-3'>
   {showSummary && "Order summary"}
 </div>
  {cartItems.length !== 0 && cartItems.map((item) => (
  
    <div className=" w-full md:w-1/2 md:px-4 py-4">
  <div className="flex flex-row justify-between items-center gap-3 md:space-x-10 border-b pb-4">
    {/* Product Image */}
    <div className='flex flex-row items-center gap-3'>
      <img 
      onClick={()=> navigate(`/Products/${item.product_id}/${item.name}`)}
      src={import.meta.env.VITE_CLOUD_URL + item.images[0]?.image} 
      alt={item.name} 
      className="h-16 w-16 object-cover rounded-md"
    />
    
    {/* Product Details */}
    <div className="flex flex-col justify-between">
      <span onClick={()=> navigate(`/Products/${item.product_id}/${item.name}`)} className="hover:cursor-pointer font-semibold text-gray-800">{item.name}</span>
     {
      item.availableQuantity >= 1 ?  <span className="text-gray-800">Qty:     {/* <td className='text-center'> */}
          <select 
            value={item.cartQuantity} 
            onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value))} 
            className="border rounded px-2 py-1 text-sm cursor-pointer w-[60px]"
          >
            {Array.from({ length: item.availableQuantity }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select></span> : <span className='text-red-500'>Out of stock</span>
     }
      <span className="font-bold text-gray-900">₹{item.availableQuantity === 0 ? item.discounted_price !== 0 ? item.discounted_price : item.price :  item.discounted_price !== 0 ? item.discounted_price * item.cartQuantity : item.price * item.cartQuantity}</span>
    </div>
    </div>
    <div>
       <button onClick={() => removeFromCart(item.product_id)} className="text-red-500 text-[26px] hover:text-red-700">&times;</button>
    </div>
  </div>

  {/* Bill Summary */}
 
</div>

  ))}

       <div className="mt-4">
    <div className="flex justify-between text-md">
      <span>Sub total</span>
      <span>₹{total}</span>
    </div>
    <div className="flex justify-between text-md">
      <span>Delivery charges</span>
      <span>₹{0}</span>
    </div>
    <div className="flex justify-between font-semibold text-lg mt-2">
      <span>Total amount</span>
      <span>₹{total}</span>
    </div>
  </div>

</div>


        {/* Customer Info Form */}
        <div className="bg-white md:w-[50%] justify-end p-4  md:py-3 lg:col-span-1 overflow-y-auto">
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
            <div className='mb-3'>
              <label className="block text-md font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={add}
                onChange={(e) => setAdd(e.target.value)}
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
           <div className="mb-3">
  <label className="block text-md font-medium text-gray-700">Phone number</label>
  <div className="flex items-center border rounded-md">
    <span className="px-3 py-3 text-gray-700 bg-gray-200">+91</span>
   <input
  type="text"
  value={phone}
  onChange={(e) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (input.length <= 10) setPhone(input);
  }}
  maxLength={10}
  className="mt-1 block w-full p-2 pl-2 border-l-0 rounded-md"
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
             {loading ? "Placing order..." : "Place Order"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
