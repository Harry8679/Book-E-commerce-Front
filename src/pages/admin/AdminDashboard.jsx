import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Dashboard Admin</h1>
      <div className="grid grid-cols-3 gap-6">
        <Link to="/admin/users" className="p-6 bg-white shadow-md rounded-md hover:bg-teal-100">
          Gérer les utilisateurs
        </Link>
        <Link to="/admin/categories" className="p-6 bg-white shadow-md rounded-md hover:bg-teal-100">
          Gérer les catégories
        </Link>
        <Link to="/admin/products" className="p-6 bg-white shadow-md rounded-md hover:bg-teal-100">
          Gérer les produits
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
