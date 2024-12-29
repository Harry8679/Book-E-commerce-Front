import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null); // Stocker les données utilisateur
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer l'utilisateur depuis localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      setError('User not authenticated');
      return;
    }

    const { token, user } = storedUser;

    // Appeler l'API pour récupérer les informations de l'utilisateur
    axios
      .get(`http://localhost:8008/api/v1/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Inclure le token dans l'en-tête
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Failed to fetch profile');
      });
  }, []);

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
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
