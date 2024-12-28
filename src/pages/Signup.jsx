import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import des icônes
import axios from 'axios'; // Pour les requêtes HTTP
import Layout from '../components/Layout';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formErrors, setFormErrors] = useState({ name: false, email: false });

  // États pour afficher/masquer les mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 6;

  const allCriteriaMet = hasUpperCase && hasLowerCase && hasNumber && hasMinLength;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      name: !name,
      email: !email,
    };

    setFormErrors(errors);

    if (!name || !email || !passwordsMatch || !allCriteriaMet) {
      setError('Please fill out all fields correctly.');
      setSuccess('');
      return;
    }

    try {
      // Envoi des données au backend via Axios
      const response = await axios.post('http://localhost:8008/api/v1/users/signup', {
        name,
        email,
        password,
      });

      // Affichage du succès
      setSuccess('User registered successfully!');
      setError('');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      // Gestion des erreurs
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  const signUpForm = () => {
    return (
      <form onSubmit={handleSubmit} className="col-span-6 bg-white shadow-md rounded-lg p-6 text-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Message de succès */}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

        {/* Message d'erreur */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                password && confirmPassword
                  ? passwordsMatch
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
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

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
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
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg transition duration-300 ${
            allCriteriaMet && passwordsMatch
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!allCriteriaMet || !passwordsMatch}
        >
          Sign Up
        </button>

        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <p className="font-medium mb-2">Password must contain:</p>
          <ul className="space-y-2">
            <li className="flex items-center">
              {hasUpperCase ? (
                <span className="text-green-600 font-bold mr-2">&#10003;</span>
              ) : (
                <span className="text-red-500 font-bold mr-2">✘</span>
              )}
              <span>At least one uppercase letter</span>
            </li>
            <li className="flex items-center">
              {hasLowerCase ? (
                <span className="text-green-600 font-bold mr-2">&#10003;</span>
              ) : (
                <span className="text-red-500 font-bold mr-2">✘</span>
              )}
              <span>At least one lowercase letter</span>
            </li>
            <li className="flex items-center">
              {hasNumber ? (
                <span className="text-green-600 font-bold mr-2">&#10003;</span>
              ) : (
                <span className="text-red-500 font-bold mr-2">✘</span>
              )}
              <span>At least one number</span>
            </li>
            <li className="flex items-center">
              {hasMinLength ? (
                <span className="text-green-600 font-bold mr-2">&#10003;</span>
              ) : (
                <span className="text-red-500 font-bold mr-2">✘</span>
              )}
              <span>At least 6 characters</span>
            </li>
          </ul>
        </div>
      </form>
    );
  };

  return (
    <Layout title="Sign Up Page" description="Node React E-commerce App">
      <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-8">
        <div className="grid grid-cols-12 gap-4 w-full px-4">
          <div className="col-span-3"></div>
          {signUpForm()}
          <div className="col-span-3"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
