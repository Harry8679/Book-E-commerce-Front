import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      setError('User not authenticated');
      return;
    }

    setUser(storedUser.user);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      setError('User not authenticated');
      return;
    }
  
    const { token } = storedUser;
  
    try {
      setLoading(true);
      const response = await axios.put(
        // Mise à jour de l'URL pour inclure "users"
        `http://localhost:8008/api/v1/users/profile/${user._id}`,
        { name: user.name, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
  
      const updatedUser = { ...storedUser, user: response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err.response || err.message);
      setError(err.response?.data?.error || 'Failed to update profile');
      toast.error(err.response?.data?.error || 'Failed to update profile', {
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Update Profile</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
