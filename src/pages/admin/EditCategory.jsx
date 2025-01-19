import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
  const { categoryId } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get(`http://localhost:8008/api/v1/categories/${categoryId}`);
      setName(response.data.name);
    };
    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    await axios.put(`http://localhost:8008/api/v1/categories/${categoryId}/${storedUser._id}`, { name }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success(`Catégorie "${name}" modifiée avec succès.`);
    navigate('/admin/categories');
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Modifier la Catégorie</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditCategory;