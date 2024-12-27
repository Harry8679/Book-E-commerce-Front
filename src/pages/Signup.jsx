import React, { useState } from 'react';
import Layout from '../components/Layout';

const Signup = () => {
  // États pour les champs
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Déterminer si les mots de passe correspondent
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation : Vérifie si les mots de passe correspondent
    if (!passwordsMatch) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Logique d'inscription (par exemple, appeler une API)
      alert('Form submitted successfully!');
    }
  };

  const signUpForm = () => {
    return (
      <form onSubmit={handleSubmit} className="col-span-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              password && confirmPassword
                ? passwordsMatch
                  ? 'border-green-500 focus:ring-green-500'
                  : 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              password && confirmPassword
                ? passwordsMatch
                  ? 'border-green-500 focus:ring-green-500'
                  : 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Confirm your password"
          />
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    );
  };

  return (
    <Layout title="Sign Up Page" description="Node React E-commerce App">
      <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-8">
        <div className="grid grid-cols-12 gap-4 w-full px-4">
          <div className="col-span-3"></div> {/* Espace vide à gauche */}
          {signUpForm()}
          <div className="col-span-3"></div> {/* Espace vide à droite */}
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
