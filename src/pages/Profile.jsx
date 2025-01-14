import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);  // Stocker les données utilisateur
  const [error, setError] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est bien stocké
    let storedUser = null;
    try {
      storedUser = JSON.parse(localStorage.getItem('user'));
    } catch (err) {
      console.error("Erreur lors du parsing des données utilisateur :", err);
      setError("Erreur de récupération des données utilisateur.");
      return;
    }

    if (!storedUser || !storedUser._id) {
      setError('Utilisateur non authentifié ou données manquantes.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      setError('Jeton de connexion manquant.');
      return;
    }

    // Requête sécurisée pour récupérer les infos utilisateur
    axios.get(`http://localhost:8008/api/v1/users/profile/${storedUser._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération du profil :", err.response || err.message);
        setError(err.response?.data?.error || 'Impossible de récupérer le profil');
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Mon Profil</h1>
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">Nom complet</h2>
          <p className="text-gray-600">{user.name}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">Email</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">Rôle</h2>
          <p className="text-gray-600">{user.role === 0 ? 'Utilisateur' : 'Administrateur'}</p>
        </div>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => window.history.back()}
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default Profile;
