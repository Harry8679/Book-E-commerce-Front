import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 📥 Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8008/api/v1/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Erreur de récupération :', err);
        toast.error("Impossible de récupérer les catégories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 🗑️ Supprimer une catégorie
  const handleDelete = async (categoryId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        await axios.delete(`http://localhost:8008/api/v1/categories/${categoryId}/${storedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success('Catégorie supprimée avec succès.');
        setCategories(categories.filter((cat) => cat._id !== categoryId));
      } catch (err) {
        console.error('Erreur de suppression :', err);
        toast.error('Erreur lors de la suppression de la catégorie.');
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Gestion des Catégories</h1>

      <button
        onClick={() => navigate('/admin/categories/create')}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        ➕ Ajouter une catégorie
      </button>

      {loading ? (
        <p>Chargement des catégories...</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="text-center">
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => navigate(`/admin/categories/view/${category._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => navigate(`/admin/categories/edit/${category._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCategories;