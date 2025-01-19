import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewCategory = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8008/api/v1/categories/${categoryId}`);
        setCategory(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération de la catégorie :', err);
        toast.error('Impossible de charger la catégorie.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-gray-500 text-center">Chargement de la catégorie...</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-teal-600 mb-4">Détails de la Catégorie</h1>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-lg text-gray-700 mb-2">
                <strong>Nom :</strong> {category.name}
              </p>
              <p className="text-sm text-gray-500">
                <strong>ID :</strong> {category._id}
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => navigate('/admin/categories')}
              >
                Retour à la Liste
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                onClick={() => navigate(`/admin/categories/edit/${category._id}`)}
              >
                Modifier la Catégorie
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewCategory;