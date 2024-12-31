import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signin = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }
  
    console.log('Attempting to login with:', { email, password });
  
    try {
      const response = await axios.post('http://localhost:8008/api/v1/users/signin', { email, password });
  
      console.log('Login response:', response.data);
  
      // Sauvegarde de l'utilisateur et redirection
      localStorage.setItem('user', JSON.stringify(response.data));
      login();
  
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 2000,
        onClose: () => navigate('/'),
      });
    } catch (err) {
      console.error('Login error:', err.response || err.message);
      setError(err.response?.data?.error || 'Invalid credentials');
      toast.error(err.response?.data?.error || 'Invalid credentials', { position: 'top-right', autoClose: 2000 });
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg transition duration-300 ${
            email && password
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!email || !password}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
