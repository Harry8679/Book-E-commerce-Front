import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      setError('Current password is required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    let storedUser = null;
    try {
      storedUser = JSON.parse(localStorage.getItem('user'));
    } catch (err) {
      console.error("Erreur lors de la récupération de l'utilisateur :", err);
      setError('Erreur lors de la récupération des données utilisateur');
      return;
    }

    if (!storedUser || !storedUser._id) {
      setError('Utilisateur non authentifié');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Jeton d’authentification manquant');
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8008/api/v1/users/profile/${storedUser._id}/password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
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
      console.error(err.response || err.message);
      setError(err.response?.data?.error || 'Échec de la mise à jour du mot de passe');
      toast.error(err.response?.data?.error || 'Échec de la mise à jour', {
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
          <div className="mb-4">
            <label htmlFor="currentPassword">Mot de passe actuel</label>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Mot de passe actuel"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Nouveau mot de passe"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Confirmer le mot de passe"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg ${loading ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
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
