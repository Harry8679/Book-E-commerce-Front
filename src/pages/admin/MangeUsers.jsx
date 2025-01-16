import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔄 Récupérer tous les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
          toast.error('Utilisateur non authentifié');
          navigate('/signin');
          return;
        }

        // ✅ Correction de l'URL
        const response = await axios.get(`http://localhost:8008/api/v1/users/users/${storedUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
        toast.error('Impossible de récupérer les utilisateurs');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  // 🚮 Supprimer un utilisateur
  const handleDelete = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        await axios.delete(`http://localhost:8008/api/v1/users/${userId}/${storedUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success('Utilisateur supprimé avec succès');
        setUsers(users.filter((user) => user._id !== userId)); // ⬅️ Mise à jour immédiate de l'affichage
      } catch (err) {
        console.error('Erreur lors de la suppression :', err);
        toast.error('Erreur lors de la suppression de l\'utilisateur');
      }
    }
  };

  // ✏️ Rediriger vers la page de modification
  const handleEdit = (userId) => {
    navigate(`/admin/users/edit/${userId}`);
  };

  // 🔍 Rediriger vers la page de profil de l'utilisateur
  const handleView = (userId) => {
    navigate(`/admin/users/view/${userId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Gestion des Utilisateurs</h1>

      {loading ? (
        <p>Chargement des utilisateurs...</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Rôle</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role === 1 ? 'Admin' : 'Utilisateur'}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  {/* 🔍 Voir */}
                  <button
                    onClick={() => handleView(user._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Voir
                  </button>

                  {/* ✏️ Modifier */}
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Modifier
                  </button>

                  {/* 🚮 Supprimer */}
                  <button
                    onClick={() => handleDelete(user._id)}
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

export default ManageUsers;
