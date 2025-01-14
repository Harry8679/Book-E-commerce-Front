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

      const { token, user } = response.data;

      // Vérifier si les données de l'utilisateur sont valides
      if (user && user.name && user.role !== undefined) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));  // Stocker l'utilisateur
        localStorage.setItem('token', token);                // Stocker le token
        login(user);  // Met à jour l'état global

        // Afficher un message de succès
        toast.success('Connexion réussie !', {
          position: 'top-right',
          autoClose: 2000,
        });

        // Redirection immédiate
        navigate('/');
      } else {
        console.error("Données utilisateur incomplètes :", response.data);
        toast.error("Erreur : données utilisateur invalides", {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error('Erreur de connexion :', err.response || err.message);
      setError(err.response?.data?.error || 'Invalid credentials');

      toast.error(err.response?.data?.error || 'Invalid credentials', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-2">Mot de passe</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre mot de passe"
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
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Signin;
