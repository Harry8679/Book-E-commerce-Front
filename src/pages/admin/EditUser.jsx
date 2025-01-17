import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
  const { userId } = useParams(); // 📦 Récupérer l'ID de l'utilisateur depuis l'URL
  const [user, setUser] = useState({ name: '', email: '', role: 0 });
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (err) {
        console.error('Erreur de récupération :', err);
        toast.error("Impossible de récupérer les données de l'utilisateur.");
      }
    };

    fetchUser();
  }, [userId]);

  // 🔄 Soumettre la mise à jour
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8008/api/v1/users/users/${userId}/admin-update-user`,
        { name: user.name, email: user.email, role: user.role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Utilisateur mis à jour avec succès !");
      navigate('/admin/users');
    } catch (err) {
      console.error('Erreur de mise à jour :', err);
      toast.error("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Modifier l'utilisateur</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block mb-2">Nom</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Rôle</label>
            <select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="w-full px-4 py-2 border rounded"
            >
              <option value={0}>Utilisateur</option>
              <option value={1}>Administrateur</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enregistrer
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUser;
