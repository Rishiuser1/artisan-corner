import React from 'react';
import { Package, CheckCircle, Clock } from 'lucide-react';

// Mock Orders Data
const MOCK_ORDERS = [
  {
    id: "ORD-2025-001",
    date: "Nov 20, 2025",
    total: 125.00,
    status: "Delivered",
    items: [
      { name: "Handcrafted Ceramic Bowl", quantity: 1, price: 45.00, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=100" },
      { name: "Wooden Serving Tray", quantity: 1, price: 80.00, image: "https://images.unsplash.com/photo-1724709163176-ff28e360df75?auto=format&fit=crop&q=80&w=100" }
    ]
  },
  {
    id: "ORD-2025-002",
    date: "Nov 15, 2025",
    total: 52.00,
    status: "Processing",
    items: [
      { name: "Leather Journal Cover", quantity: 1, price: 52.00, image: "https://images.unsplash.com/photo-1512414947060-048d53abb081?auto=format&fit=crop&q=80&w=100" }
    ]
  }
];

const OrderHistoryPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Order History</h1>
      <p className="text-gray-500 mb-10">Check the status of recent orders, manage returns, and discover similar products.</p>

      <div className="space-y-8">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Order Placed</p>
                  <p className="text-sm font-medium text-gray-900">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
                  <p className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Order #</p>
                  <p className="text-sm font-medium text-gray-900">{order.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm font-medium">
                {order.status === "Delivered" ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-orange-500" />}
                {order.status}
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-6 items-center mb-6 last:mb-0">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <button className="text-orange-600 text-sm font-medium hover:underline">
                    Buy Again
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;