import React, { useState, useContext, useEffect } from 'react';
import Button from './Button';
import { CartContext } from '../context/CartContext';
import axios from 'axios'; // Import axios for making backend requests
import { toast, ToastContainer } from 'react-toastify'; // For showing success/error messages
import OrderConfirmation from './OrderConfirmation';
import { useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
   const [phone, setPhone] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [customer, setCustomer] = useState([])
   const navigate = useNavigate()
  const { cartItems, cartTotal,emptyCart } = useContext(CartContext);
  const [total, setTotal] = useState(cartTotal);
    const [dialogOpen, setDialogOpen] = useState(false);
const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedPhone = phone.startsWith('0') ? phone.slice(1) : phone;
const fullAddress = `${apartment}, ${city}, ${state}, ${pincode}`;
const customerDetails = {
  email,
  name: `${firstName} ${lastName}`,
  address: fullAddress,
  phone_number: "91" + formattedPhone,
  pincode: pincode,
  visible: true
};

 


    // Create order payload
   const frontendOrderDetails = {
  orderDetails : {
    items: cartItems.map((item) => ({
    name: item.name,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.discounted_price !== 0 ? item.discounted_price : item.price,
    image: import.meta.env.VITE_CLOUD_URL + item.images[0]?.image, // Include the image
    visible: true
  })),
  total: total,
  count: cartItems.length,
  visible: true
},
customerDetails : customerDetails
  
};
console.log(cartItems)

// Backend payload (excluding images)
const orderPayload = {
  orderDetails: {
    items: cartItems.map((item) => ({
      name: item.name,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.discounted_price !== 0 ? item.discounted_price : item.price,
    })),
    total: total,
    count: cartItems.length,
  },
  customerDetails: customerDetails,
};


setCustomer(frontendOrderDetails); // Use this for the OrderConfirmation page
handleOpenDialog();

    
   

    // Prepare the message for sending
    let message = 'Order Details:\n\n';
    cartItems.forEach((item) => {
      message += `${item.name} × ${item.quantity}: Rs. ${item.price * item.quantity}\n`;
    });
    message += `\nTotal: Rs. ${total}`;

    try {
 
      await Promise.all([
        axios.post(`${baseUrl}/api/create-order/`, orderPayload),
        // axios.post(`${baseUrl}/api/send-message/`, { message }),  // Wrap message in an object if required by the API
      ]);

      
      toast.success("Order placed successfully!!");
      setTimeout(()=>{
        handleOpenDialog()
          emptyCart();
        navigate("/products")
      },2000)

      
      
    } catch (error) {
      console.log(error);
      toast.error("Couldn't place order");
    }
  };

 
  return (
    <div className=" flex flex-col mx-auto justify-center items-center bg-white">
      <OrderConfirmation open={dialogOpen} handleClose={handleCloseDialog} customer={customer}/>
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
        <div className={`bg-[#edf3ed] w-[100%] md:w-[50%] md:max-w-[50%] md:col-span-1 md:sticky md:top-0 px-4 pb-4 md:py-6 transition-all duration-300 md:block ${showSummary ? 'block' : 'hidden'}`}>
  <table className="md:min-w-full md:px-3 min-w-full justify-center divide-y divide-gray-500">
    <tbody className="divide-y max-w-[100%] divide-gray-300">
      {cartItems.length !== 0 && cartItems.map((item) => (
        <tr className="px-2 md:px-0" key={item.product_id}>
          <td className="py-3">
            <div className="">
              <img src={import.meta.env.VITE_CLOUD_URL+ item.images[0]?.image} alt="" className="h-auto max-w-8 md:max-w-16 flex justify-start mx-auto" />
            </div>
          </td>
          <td className="px-1 py-2 text-sm md:text-md">
            <div className="flex flex-row gap-x-2 justify-between">
              <span>{item.name}&nbsp;&nbsp;×&nbsp;&nbsp;{item.quantity}</span>
              <span>Rs {item.discounted_price !== 0 ? item.discounted_price * item.quantity : item.price * item.quantity}</span>
            </div>
          </td>
        </tr>
      ))}
      <tr className="px-2 md:px-0 ">
        <td className="py-2 text-sm md:text-md text-left md:pl-5 lg:pl-10" colSpan="2">
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free shipping</span>
          </div>
        </td>
      </tr>
      <tr className="px-2 md:px-0">
        <td className="py-2 text-sm md:text-md text-left font-semibold md:pl-5 lg:pl-10" colSpan="2">
          <div className="flex justify-between">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
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
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
