import React, { useState, useEffect, useRef } from 'react';

// Your Sandbox Client ID
const PAYPAL_CLIENT_ID = "AdayyqiktdOdqYdiApKXU7AbUNuZEvq6NeBGbCWaeU8bj6V6uYhdG0Oe-J71B4w5d-IKIjSdp1AR7v6V"; 

const PayPalButton = ({ amount, onSuccess }) => {
  const paypalRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load PayPal SDK script dynamically
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    return () => {
      if(document.body.contains(script)) document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    if (loaded && window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: "Artisan's Corner Purchase",
              amount: { currency_code: "USD", value: amount.toFixed(2) }
            }]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("PayPal Order Successful:", order);
          onSuccess(order);
        },
        onError: (err) => {
          console.error("PayPal Error:", err);
          alert("Payment failed. Please try again.");
        }
      }).render(paypalRef.current);
    }
  }, [loaded, amount, onSuccess]);

  if (!loaded) return <div className="text-center p-4 text-sm text-gray-500">Loading Payment Options...</div>;

  return <div ref={paypalRef} className="w-full" />;
};

export default PayPalButton;