import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Button from "./Button";
const OrderConfirmation = ({ open, handleClose, customer }) => {
     console.log(customer)
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-semibold text-green-500 text-center flex-1">Order Confirmation</h1>
    <button
      onClick={handleClose}
      className="text-gray-500 hover:text-gray-700 transition duration-200"
      aria-label="Close"
    >
      ✖
    </button>
  </div>
</DialogTitle>


      <DialogContent className="slider">
        <div className="max-w-lg mx-auto my-2 p-2 px-4 bg-white border border-gray-200 rounded-lg shadow-md">
          {/* Header Section */}
          <div className="text-center mb-4 md:mb-2">
            <p className="text-gray-600 mt-2">
              Thank you for your order, <strong>{customer.customerDetails?.name}</strong>!
            </p>
          </div>

          {/* Order Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-1">
              Order Details
            </h3>
            {/* <p className="text-gray-700 mb-2">
              <strong>Order ID:</strong> {order.order_id}
            </p> */}
            <p className="text-gray-700 mb-2">
              <strong>Total Amount:</strong> ₹{customer.orderDetails?.total}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Items:</strong>
            </p>
            <ul className="list-none p-0">
              {customer?.orderDetails?.items?.map((item, index) => (
                <li key={item.product_id} className="flex items-center gap-4 my-3">
                <img
                  src={import.meta.env.VITE_CLOUD_URL + item.image}
                  alt={item.name}
                  className="w-[20%] h-auto object-cover"
                />
                <div>
                  <p>{item.name} × {item.quantity}</p>
                  <p>Rs. {item.price * item.quantity}</p>
                </div>
              </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <div className="text-center w-full mb-4">
          <p className="text-gray-600 text-sm">
            If you have any questions, feel free to contact us at{" "}
            <a
              href="mailto:support@yourcompany.com"
              className="text-green-500 hover:underline"
            >
              support@yourcompany.com
            </a>
          </p>
          
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default OrderConfirmation;
