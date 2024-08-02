// CheckoutForm.js
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ totalAmount, onPaymentSuccess, paymentMethod }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (stripe && paymentMethod !== 'card') {
      const pr = stripe.paymentRequest({
        country: 'IN',
        currency: 'inr',
        total: {
          label: 'Total',
          amount: totalAmount * 100, // Amount in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
        // Specify supported payment methods
        supportedPaymentMethods: ['card', 'upi', { supportedMethods: ['https://google.com/pay'] }],
      });

      // Check if the browser supports the payment method
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (event) => {
        setProcessing(true);
        try {
          const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: totalAmount * 100 }),
          });

          const { clientSecret } = await response.json();

          const confirmResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: event.paymentMethod.id,
          });

          if (confirmResult.error) {
            event.complete('fail');
            setErrorMessage(confirmResult.error.message);
          } else {
            event.complete('success');
            if (confirmResult.paymentIntent.status === 'succeeded') {
              setPaymentSucceeded(true);
              onPaymentSuccess();
            }
          }
        } catch (error) {
          setErrorMessage('Payment failed. Please try again.');
        }

        setProcessing(false);
      });
    }
  }, [stripe, totalAmount, paymentMethod]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setErrorMessage('');

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Convert to cents
      });

      const { clientSecret } = await response.json();

      // Confirm the card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Customer Name',
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setPaymentSucceeded(true);
          onPaymentSuccess();
        }
      }
    } catch (error) {
      setErrorMessage('Payment failed. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <div className="checkout-form-container">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Payment</h2>

        {paymentMethod !== 'card' && paymentRequest ? (
          <div className="mb-4">
            <PaymentRequestButtonElement options={{ paymentRequest }} />
            <p className="text-sm text-gray-600 mt-2">Use UPI, Google Pay, or other payment methods supported by your device.</p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-2">Credit Card Payment</h3>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        )}

        {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}

        <button
          type="submit"
          disabled={!stripe || isProcessing || paymentSucceeded}
          className={`bg-yellow-500 text-white py-2 px-4 rounded-lg mt-4 ${isProcessing ? 'opacity-50' : ''}`}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
