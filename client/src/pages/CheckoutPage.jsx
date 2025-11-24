import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard } from 'lucide-react';
import PayPalButton from '../components/PayPalButton'; 

const CheckoutPage = ({ cartItems = [], onCheckoutSuccess }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    country: ''
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Move to payment step
  };

  const handlePaymentSuccess = (order) => {
    if (onCheckoutSuccess) {
      onCheckoutSuccess(order);
    }
    navigate('/my-orders'); // Redirect to order history after success
  };

  if (cartItems.length === 0) {
    return <div className="text-center py-20">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <button onClick={() => navigate('/cart')} className="flex items-center text-gray-500 hover:text-black mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
      </button>

      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Left Column: Forms */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Step 1: Shipping */}
          <div className={`p-6 rounded-2xl border ${step === 1 ? 'border-black ring-1 ring-black' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <h2 className="text-xl font-bold">Shipping Information</h2>
            </div>

            {step === 1 ? (
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <input required placeholder="Full Name" className="w-full p-3 border rounded-lg outline-none focus:border-black" value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} />
                <input required placeholder="Street Address" className="w-full p-3 border rounded-lg outline-none focus:border-black" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="City" className="w-full p-3 border rounded-lg outline-none focus:border-black" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} />
                  <input required placeholder="ZIP Code" className="w-full p-3 border rounded-lg outline-none focus:border-black" value={shippingInfo.zip} onChange={e => setShippingInfo({...shippingInfo, zip: e.target.value})} />
                </div>
                <input required placeholder="Country" className="w-full p-3 border rounded-lg outline-none focus:border-black" value={shippingInfo.country} onChange={e => setShippingInfo({...shippingInfo, country: e.target.value})} />
                <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 mt-4">Continue to Payment</button>
              </form>
            ) : (
              <div className="text-gray-600 pl-11">
                <p>{shippingInfo.fullName}</p>
                <p>{shippingInfo.address}, {shippingInfo.city}</p>
                <button onClick={() => setStep(1)} className="text-orange-600 text-sm underline mt-2">Edit</button>
              </div>
            )}
          </div>

          {/* Step 2: Payment */}
          <div className={`p-6 rounded-2xl border ${step === 2 ? 'border-black ring-1 ring-black' : 'border-gray-200 opacity-50'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <h2 className="text-xl font-bold">Payment Method</h2>
            </div>
            
            {step === 2 && (
              <div className="pl-11">
                <p className="text-sm text-gray-500 mb-4">Secure payment via PayPal</p>
                <PayPalButton amount={total} onSuccess={handlePaymentSuccess} />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="bg-gray-50 p-6 rounded-2xl h-fit sticky top-24">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.quantity}x {item.name}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;