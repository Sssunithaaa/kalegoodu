import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "./Button";
const OrderConfirmation = ({ customer }) => {
  const navigate = useNavigate();

  

const location = useLocation();
const  orderPayload  = location.state?.orderPayload || null;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-green-500 p-4 text-white text-center">
        <h1 className="text-2xl font-semibold">Order Confirmation</h1>
      </header> */}

      {/* Content Section */}
      <main className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-3">
        <div className="text-center mb-4">
          <p className="text-gray-600 mt-2 md:text-2xl">
            Thank you for your order, <strong>{orderPayload.orderPayloadDetails?.name}</strong>!
          </p>
        </div>

        {/* Order Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-1">
            Order Details
          </h3>
          <p className="text-gray-700 mb-2">
            <strong>Total Amount:</strong> ₹{orderPayload.orderDetails?.total}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Items:</strong>
          </p>
          <ul className="list-none p-0">
            {orderPayload?.orderDetails?.items?.map((item) => (
              <li key={item.product_id} className="flex items-center gap-4 my-3">
                <img
                  src={`${import.meta.env.VITE_CLOUD_URL}${item.image}`}
                  alt={item.name}
                  className="w-24 h-auto object-cover"
                />
                <div>
                  <p>{item.name} × {item.quantity}</p>
                  <p>₹{item.price * item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            If you have any questions, feel free to contact us at{" "}
            <a
              href="mailto:support@yourcompany.com"
              className="text-green-500 hover:underline"
            >
              kalegoodu@gmail.com
            </a>
          </p>
          <Button className="mt-4 px-4 py-2" onClick={() => navigate("/products")}>
            Continue shopping
          </Button>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
