import React, { useState, useContext, useEffect } from 'react';
import Button from './Button';
import { CartContext } from '../context/CartContext';
import axios from 'axios'; // Import axios for making backend requests
import { toast, ToastContainer } from 'react-toastify'; // For showing success/error messages
import OrderConfirmation from './OrderConfirmation';
import { useNavigate } from 'react-router-dom';
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import FullPageLoader from './FullPageLoader';

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
  const { cartItems,setCartItems, cartTotal,emptyCart } = useContext(CartContext);
  const [total, setTotal] = useState(cartTotal);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { error, isLoading, Razorpay } = useRazorpay();

  // const handlePayment = () => {
  //   const options = {
  //     key: "rzp_live_ux3J6SlCY0eJYi",
  //     amount: 50000, // Amount in paise
  //     currency: "INR",
  //     name: "Test Company",
  //     description: "Test Transaction",
  //     order_id: "order_9A33XWu170gUtm", // Generate order_id on server
  //     handler: (response) => {
  //       console.log(response);
  //       alert("Payment Successful!");
  //     },
  //     prefill: {
  //       name: "John Doe",
  //       email: "john.doe@example.com",
  //       contact: "9999999999",
  //     },
  //     theme: {
  //       color: "#F37254",
  //     },
  //   };

  //   const razorpayInstance = new Razorpay(options);
  //   razorpayInstance.open();
  // };

const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    navigate("/products")
  };

  useEffect(() => {
    let totalPrice = 0;
    cartItems?.forEach((item) => {
      totalPrice += item.discounted_price !== 0 ? item.discounted_price * item.quantity : item.price * item.quantity;
    });
    setTotal(totalPrice);
  }, [cartItems]);

  const baseUrl = import.meta.env.VITE_APP_URL;
  
 // Function to submit form and send the data to the backend
//   const handleFormSubmitt = async (e) => {
//     e.preventDefault();

//     const formattedPhone = phone.startsWith('0') ? phone.slice(1) : phone;
// const fullAddress = `${apartment}, ${city}, ${state}, ${pincode}`;
// const customerDetails = {
//   email,
//   name: `${firstName} ${lastName}`,
//   address: fullAddress,
//   phone_number: "91" + formattedPhone,
//   pincode: pincode,
//   visible: true
// };

 


//     // Create order payload
//    const frontendOrderDetails = {
//   orderDetails : {
//     items: cartItems.map((item) => ({
//     name: item.name,
//     product_id: item.product_id,
//     quantity: item.quantity,
//     price: item.discounted_price !== 0 ? item.discounted_price : item.price,
//     image: import.meta.env.VITE_CLOUD_URL + item.images[0]?.image, // Include the image
//     visible: true
//   })),
//   total: total,
//   count: cartItems.length,
//   visible: true
// },
// customerDetails : customerDetails
  
// };
// console.log(cartItems)

// // Backend payload (excluding images)
// const orderPayload = {
//   orderDetails: {
//     items: cartItems.map((item) => ({
//       name: item.name,
//       product_id: item.product_id,
//       quantity: item.quantity,
//       price: item.discounted_price !== 0 ? item.discounted_price : item.price,
//     })),
//     total: total,
//     count: cartItems.length,
//   },
//   customerDetails: customerDetails,
// };


//     setCustomer(frontendOrderDetails); // Use this for the OrderConfirmation page
//     handleOpenDialog();

//     // Prepare the message for sending
//     let message = 'Order Details:\n\n';
//     cartItems.forEach((item) => {
//       message += `${item.name} × ${item.quantity}: Rs. ${item.price * item.quantity}\n`;
//     });
//     message += `\nTotal: Rs. ${total}`;

//     try {
 
//       await Promise.all([
//         axios.post(`${baseUrl}/api/create-order/`, orderPayload),
//         // axios.post(`${baseUrl}/api/send-message/`, { message }),  // Wrap message in an object if required by the API
//       ]);

      
//       toast.success("Order placed successfully!!");
//       setTimeout(()=>{
//         handleOpenDialog()
//           emptyCart();
//         navigate("/products")
//       },2000)

      
      
//     } catch (error) {
//       console.log(error);
//       toast.error("Couldn't place order");
//     }
  

//   };

const [loading,setIsLoading] = useState(false)


//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true)
//     const formattedPhone = phone.startsWith("0") ? phone.slice(1) : phone;
//     const fullAddress = `${apartment}, ${city}, ${state}, ${pincode}`;
//     const customerDetails = {
//       email,
//       name: `${firstName} ${lastName}`,
//       address: fullAddress,
//       phone_number: "91" + formattedPhone,
//       pincode,
//       visible: true,
//     };

//     // Send order details to backend and get Razorpay order ID
//     try {
//       const response = await axios.post("https://kalegoodupractice.pythonanywhere.com/api/create-payment/", {amount:100}, {
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


      

//       const { razorpay_order_id, amount, currency } = response.data;


//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: amount.toString(),
        
//         currency: currency,
//         name: "Kalegoodu",
//         description: "Order Payment",
//         order_id: razorpay_order_id,
//         handler: async function (response) {
//           try {
//             // Verify payment with the backend
//             const res = await axios.post(`${baseUrl}/api/verify-payment/`, response);
//             console.log(res)
//             toast.success("Payment successful!");
//             emptyCart();
//             navigate("/products");
              
//           } catch (error) {
//             toast.error("Payment verification failed!");
//             console.error(error);
//           }
//         },
//         prefill: {
//           name: `${firstName} ${lastName}`,
//           email,
//           contact: `+91${phone}`,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };


//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
     
//       toast.error("Payment failed! Please try again.");

//     }
//   setIsLoading(false)
//   };
 const [orderLoading, setIsOrderLoading] = useState(false);
const handleFormSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
 

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
        quantity: 1,
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
            // setIsOrderLoading(true); // Show loader during backend processing

            // Create order in the backend
            const res = await axios.post(`${baseUrl}/api/create-order/`, orderPayload);

            toast.success("Order placed successfully!");
            emptyCart();
            
            // Navigate to Order Confirmation page with order details
            setTimeout(()=>{
              navigate("/Order-Confirmation", { state: { orderPayload } });
            },2000)

          } else {
            toast.error("Payment verification failed!");
          }
        } catch (error) {
          console.error("Payment verification or order creation failed:", error);
          toast.error("Error placing order!");
        } finally {
          // setIsOrderLoading(false); // Stop loader
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
        ? { ...item, quantity } 
        : item
    )
  );
};

 
  return (
    <div className=" flex flex-col mx-auto justify-center items-center bg-white">
      {orderLoading && <FullPageLoader/>}
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
        

        {/* Order Summary */}
     <div className={`bg-[#edf3ed] w-[100%] md:w-[50%] md:max-w-[50%] md:col-span-1 md:sticky md:top-0 px-4 pb-4 md:pb-6 transition-all duration-300 md:block ${showSummary ? 'block' : 'hidden'}`}>
  {/* <table className="md:min-w-full table-fixed md:px-3 min-w-full justify-center divide-y divide-gray-500"> */}
  {/* <tbody className="divide-y max-w-[100%] divide-gray-300"> */}
 <div className='text-lg md:text-2xl text-center font-bold my-3'>
   {showSummary && "Order summary"}
 </div>
  {cartItems.length !== 0 && cartItems.map((item) => (
    // <tr className="" key={item.product_id}>
    //   <td className="text-center py-3">
    //     <div>
    //       <img 
    //         src={import.meta.env.VITE_CLOUD_URL + item.images[0]?.image} 
    //         alt="" 
    //         className="h-auto max-w-8 md:max-w-16 flex justify-center lg:ml-10" 
    //       />
    //     </div>
    //   </td>
    //   <td className="text-center flex flex-col">
    //     {/* <div className="flex text-[14px] md:text-[16px] items-center justify-between gap-x-4"> */}
    //       {/* Product Name */}
    //       <span className="whitespace-nowrap">{item.name}</span>
          
        
    //       {/* Quantity Selector */}
    // //       {/* <td className='text-center'> */}
    //       <select 
    //         value={item.quantity} 
    //         onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value))} 
    //         className="border rounded px-2 py-1 text-sm cursor-pointer w-[60px]"
    //       >
    //         {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
    //           <option key={num} value={num}>{num}</option>
    //         ))}
    //       </select>
    //       {/* </td>
    //       <td className='text-center'> */}

    //       {/* Price Display */}
    //       <span className="">
    //         Rs {item.discounted_price !== 0 ? item.discounted_price * item.quantity : item.price * item.quantity}
    //       </span>
    //     {/* </div> */}
    //   {/* </td> */}
    //     </td>
    // </tr>
    <div className="bg-[#edf3ed] w-full md:w-1/2 md:px-4 py-4">
  <div className="flex items-center gap-3 md:space-x-10 border-b pb-4">
    {/* Product Image */}
    <img 
      onClick={()=> navigate(`/Products/${item.product_id}/${item.name}`)}
      src={import.meta.env.VITE_CLOUD_URL + item.images[0]?.image} 
      alt={item.name} 
      className="h-16 w-16 object-cover rounded-md"
    />
    
    {/* Product Details */}
    <div className="flex flex-col justify-between">
      <span onClick={()=> navigate(`/Products/${item.product_id}/${item.name}`)} className="hover:cursor-pointer font-semibold text-gray-800">{item.name}</span>
      <span className="text-gray-800">Qty:     {/* <td className='text-center'> */}
          <select 
            value={item.quantity} 
            onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value))} 
            className="border rounded px-2 py-1 text-sm cursor-pointer w-[60px]"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select></span>
      <span className="font-bold text-gray-900">₹{item.discounted_price !== 0 ? item.discounted_price * item.quantity : item.price * item.quantity}</span>
    </div>
  </div>

  {/* Bill Summary */}
 
</div>

  ))}
  {/* <tr className=" ">
        <td className="py-2   text-center" colSpan="4">
          <div className="px-2  text-md md:text-lg flex justify-between">
            <span>Shipping</span>
            <span>Free shipping</span>
          </div>
        </td>
      </tr>
      <tr className="">
        <td className="py-2  text-center font-semibold " colSpan="4">
          <div className="px-2  text-md md:text-lg flex justify-between">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
        </td>
      </tr> */}
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
{/* </tbody> */}



  {/* </table> */}
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
      onChange={(e) => setPhone(e.target.value)}
      length={10}
      maxLength={10}  // Allow only 10 digits for the phone number
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
