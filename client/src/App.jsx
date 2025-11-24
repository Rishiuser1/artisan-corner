import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';
import { addToCart, removeFromCart, updateQuantity, clearCart } from './redux/cartSlice';
import { MOCK_PRODUCTS } from './api/mockProducts'; 

import React, { useEffect } from 'react';
// Icons
import { Store, ShoppingCart, User, LogOut, Search } from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';

import RegisterPage from './pages/RegisterPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
// --- VENDOR & CUSTOMER PAGES ---
// These pages contain the specific API functions (fetchVendorSales, fetchCustomerOrders)
import DashboardPage from './pages/DashboardPage'; // Vendor Functionality lives here
import OrderHistoryPage from './pages/OrderHistoryPage'; // Customer Functionality lives here

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  // Redux State
  const { user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Handlers ---
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Cart & Product Actions
  const handleAddToCart = (product) => dispatch(addToCart(product));
  const handleUpdateQuantity = (id, quantity) => dispatch(updateQuantity({ id, quantity }));
  const handleRemoveItem = (id) => dispatch(removeFromCart(id));
  const handleCheckoutSuccess = () => dispatch(clearCart());
  const handleClearCart = () => dispatch(clearCart());

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Cart Badge Countāāā
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c2420] font-sans flex flex-col">
      <ScrollToTop />
      
      {/* --- Navbar --- */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">AC</div>
                <span className="text-xl font-bold text-gray-900">Artisan's Corner</span>
              </Link>
            </div>
            
            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
              
              {/* --- VENDOR FUNCTION: Link to Dashboard --- */}
              {/* This only shows if the logged-in user is a VENDOR */}
              {user && user.role === 'VENDOR' && (
                <Link to="/dashboard" className="text-sm font-medium text-gray-900 hover:text-orange-600 px-3 py-2 border border-gray-200 rounded-md">
                  Vendor Dashboard
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart" className="text-gray-900 hover:text-orange-600 p-2 rounded-full relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth Menu */}
              {user ? (
                <>
                  <Link 
                    to={user.role === 'VENDOR' ? "/dashboard" : "/my-orders"} 
                    className="text-gray-900 hover:text-orange-600 p-2 rounded-full"
                    title="My Account"
                    >
                    {/* --- CUSTOMER/VENDOR FUNCTION: Link to Account --- */}
                    <User className="h-6 w-6" />
                  </Link>

                  <button onClick={handleLogout} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </>
              ) : (
                <Link to="/register" className="text-gray-900 hover:text-orange-600 px-3 py-2 font-medium">Sign In</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- Routes (Traffic Control) --- */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/register" element={<RegisterPage />} />

          
          {/* --- VENDOR FUNCTION ROUTE --- */}
          {/* This page will use 'fetchVendorProducts' and 'createProduct' APIs */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* --- CUSTOMER FUNCTION ROUTE --- */}
          {/* This page will use 'fetchCustomerOrders' API */}
          <Route path="/my-orders" element={<OrderHistoryPage />} />

          {/* Cart & Product Routes */}
          <Route path="/cart" element={<CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onClearCart={handleClearCart} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onCheckoutSuccess={handleCheckoutSuccess} />} />
          <Route path="/products/:id" element={<ProductDetailPage products={MOCK_PRODUCTS} onAddToCart={handleAddToCart} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;