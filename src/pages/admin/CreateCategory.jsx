import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user'));

      await axios.post(`http://localhost:8008/api/v1/categories/create/${storedUser._id}`, { name }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`Catégorie "${name}" créée avec succès.`);
      navigate('/admin/categories');
    } catch (err) {
      console.error('Erreur de création :', err);
      toast.error("Erreur lors de la création de la catégorie.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Créer une Catégorie</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de la catégorie"
          className="w-full px-4 py-2 border rounded mb-4"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
