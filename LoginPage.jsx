import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { loginSuccess } from '../redux/authSlice';
import { Mail, Lock } from 'lucide-react'; // Icons

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Call the login API
      const { data } = await loginUser(formData);

      // 2. Dispatch the user and token to Redux
      dispatch(loginSuccess(data));

      // 3. Redirect to homepage
      navigate('/');
    } catch (err) {
      console.error(err);
      // Display the specific error message from the backend
      setError(err.response?.data?.message || 'Login failed. Check server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-beige">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-dark font-serif">
            Welcome Back!
          </h2>
        </div>
        <form className="mt-8 space-y-6 bg-white p-8 shadow-xl rounded-xl border border-gray-100" onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-4 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-brand-dark rounded-lg focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full px-4 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-brand-dark rounded-lg focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <span className="block sm:inline text-sm">{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-brand-teal hover:bg-brand-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal shadow-md disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </div>
          <div className="text-sm text-center">
            <Link to="/register" className="font-medium text-brand-accent-light hover:text-brand-teal">
              Don't have an account? Create one here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;