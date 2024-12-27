import React from 'react';
import Layout from '../components/Layout';

const Signup = () => {
  const signUpForm = () => {
    return (
      <form action="" className="col-span-6 bg-white shadow-md rounded-lg p-6">
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

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Enter your password"
          />
        </div>

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
