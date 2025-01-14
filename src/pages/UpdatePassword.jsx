import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // États pour afficher/masquer les mots de passe
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  // 🔑 Récupération sécurisée des données utilisateur
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedUser._id && storedToken) {
        setUserId(storedUser._id);
        setToken(storedToken);
      } else {
        setError('Utilisateur non authentifié');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des données utilisateur', err);
      setError('Erreur lors du chargement des données utilisateur');
    }
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Le nouveau mot de passe et la confirmation ne correspondent pas');
      return;
    }

    try {
      setLoading(true);

      // 📡 Correction de l'URL de l'API
      await axios.put(
        `http://localhost:8008/api/v1/users/profile/${userId}/password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('Mot de passe mis à jour avec succès !', {
        position: 'top-right',
        autoClose: 2000,
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err) {
      console.error('Erreur lors de la mise à jour du mot de passe', err);
      setError(err.response?.data?.error || 'Échec de la mise à jour du mot de passe');
      toast.error(err.response?.data?.error || 'Erreur lors de la mise à jour', {
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Modifier le mot de passe</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleUpdatePassword}>
          {/* Mot de passe actuel */}
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block font-medium mb-2">Mot de passe actuel</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mot de passe actuel"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Nouveau mot de passe */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block font-medium mb-2">Nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nouveau mot de passe"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Confirmation du nouveau mot de passe */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-2">Confirmer le mot de passe</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirmer le mot de passe"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg transition duration-300 ${
              loading
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
