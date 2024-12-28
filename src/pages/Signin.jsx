import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import des icônes
import axios from 'axios'; // Pour les requêtes HTTP
import { toast, ToastContainer } from 'react-toastify'; // Import React Toastify
import 'react-toastify/dist/ReactToastify.css'; // Styles pour React Toastify
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import Layout from '../components/Layout';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Hook pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      // Envoi des données au backend via Axios
      const response = await axios.post('http://localhost:8008/api/v1/users/signin', {
        email,
        password,
      });

      // Notification de succès
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 2000,
        onClose: () => {
          // Redirection après la fin de la notification
          navigate('/'); // Remplacez '/' par la route de la page d'accueil
        },
      });

      // Réinitialisation des champs
      setEmail('');
      setPassword('');
      setError('');

      // Sauvegarder le token dans le localStorage ou dans un context/Redux
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      // Gestion des erreurs
      setError(err.response?.data?.message || 'Invalid credentials');
      toast.error(err.response?.data?.message || 'Invalid credentials', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  const signInForm = () => {
    return (
      <form onSubmit={handleSubmit} className="col-span-6 bg-white shadow-md rounded-lg p-6 text-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {/* Message d'erreur */}
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
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
    );
  };

  return (
    <Layout title="Sign In Page" description="Node React E-commerce App">
      <ToastContainer /> {/* Conteneur pour les notifications */}
      <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-8">
        <div className="grid grid-cols-12 gap-4 w-full px-4">
          <div className="col-span-3"></div>
          {signInForm()}
          <div className="col-span-3"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
