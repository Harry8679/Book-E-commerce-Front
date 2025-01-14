import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const [user, setUser] = useState({ _id: '', name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🔎 Chargement sécurisé des données utilisateur
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!storedUser || !token) {
        setError('Utilisateur non authentifié');
        return;
      }

      // Vérifier si les données sont bien structurées
      if (storedUser._id && storedUser.name && storedUser.email) {
        setUser(storedUser);  // Directement stocker les données
      } else if (storedUser.user) {
        setUser(storedUser.user);  // Si encapsulé dans user
      } else {
        throw new Error('Données utilisateur incorrectes');
      }
    } catch (err) {
      console.error("Erreur lors du chargement des données utilisateur :", err);
      setError("Erreur de récupération des données utilisateur.");
    }
  }, []);

  // 🔄 Gestion de la mise à jour
  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Utilisateur non authentifié');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `http://localhost:8008/api/v1/users/profile/${user._id}`,
        { name: user.name, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Profil mis à jour avec succès !', {
        position: 'top-right',
        autoClose: 2000,
      });

      // 📦 Mise à jour du localStorage
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil :', err);
      setError(err.response?.data?.error || 'Échec de la mise à jour du profil');
      toast.error(err.response?.data?.error || 'Erreur lors de la mise à jour du profil', {
        position: 'top-right',
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ToastContainer />
      <div className="container mx-auto max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Modifier le Profil</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleUpdate}>
          {/* Champ Nom */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">Nom complet</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nom complet"
            />
          </div>

          {/* Champ Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg transition duration-300 ${
              loading
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Mise à jour...' : 'Mettre à jour le profil'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
