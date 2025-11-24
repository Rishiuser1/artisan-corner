import axios from 'axios';

// Create an 'instance' of axios
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend server address
});

// This will add the JWT token to EVERY request if we have it
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- Auth APIs ---
export const testApi = () => API.get('/test');
export const registerUser = (formData) => API.post('/auth/register', formData);
export const loginUser = (formData) => API.post('/auth/login', formData);
// ... after createPaymentIntent ...

// --- Review API ---
export const createReview = (productId, reviewData) => API.post(`/products/${productId}/reviews`, reviewData);

// --- Product APIs ---
export const fetchProducts = () => API.get('/products');
export const fetchProductById = (id) => API.get(`/products/${id}`);

// --- Vendor APIs ---
export const createProduct = (productData) => API.post('/products', productData);
export const fetchVendorProducts = () => API.get('/vendor/my-products');
export const updateProduct = (productId, updateData) => API.put(`/products/${productId}`, updateData);

// --- Order & Payment APIs ---
export const createOrder = (cartData) => API.post('/orders', cartData);
export const createPaymentIntent = (cartData) => API.post('/payments/create-payment-intent');
export const fetchCustomerOrders = () => API.get('/orders/my-orders');
export const fetchVendorSales = () => API.get('/vendor/my-sales');