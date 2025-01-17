import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewUser = () => {
  const { userId } = useParams(); // 📦 Récupérer l'ID de l'utilisateur depuis l'URL
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // 🔄 Charger les données de l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8008/api/v1/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Erreur de récupération :', err);
        toast.error("Impossible de récupérer les données de l'utilisateur.");
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Détails de l'utilisateur</h1>

      <div className="bg-white p-6 rounded shadow-md">
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Rôle :</strong> {user.role === 1 ? 'Admin' : 'Utilisateur'}</p>

        <button
          onClick={() => navigate('/admin/users')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default ViewUser;