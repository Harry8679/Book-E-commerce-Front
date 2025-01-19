import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Books from './pages/Books';
import UpdateProfile from './pages/UpdateProfile';
import UpdatePassword from './pages/UpdatePassword';
import Dashboard from './pages/Dashboard';
import AdminRoute from './AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/MangeUsers';
import ManageCategories from './pages/admin/ManageCategories';
import ManageProducts from './pages/admin/ManageProducts';
import EditUser from './pages/admin/EditUser';
import ViewUser from './pages/admin/ViewUser';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);  // ✅ Nouvel état pour le chargement

  // ✅ Vérifier l'état de connexion
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const user = JSON.parse(userData);
      setIsAuthenticated(true);
      setUserRole(user.role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }

    setLoading(false);  // ✅ Indiquer que la vérification est terminée
  }, []);

  // ✅ Connexion de l'utilisateur
  const login = (user, token) => {
    if (user && token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
      setUserRole(user.role);
    } else {
      console.error("Erreur : Données utilisateur ou token manquantes");
    }
  };

  // ✅ Déconnexion de l'utilisateur
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (loading) {
    // ✅ Afficher un écran de chargement avant de vérifier les routes
    return <p className="text-center mt-10 text-lg">Chargement...</p>;
  }

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />
      <Routes>
        <Route path="/signin" element={isAuthenticated ? (<Navigate to="/" />) : (<Signin login={login} />)} />
        <Route path="/signup" element={isAuthenticated ? (<Navigate to="/" />) : (<Signup />)} />
        <Route path="/dashboard" element={isAuthenticated ? (<Dashboard />) : (<Navigate to="/signin" />)} />
        <Route path="/profile" element={isAuthenticated ? (<Profile />) : (<Navigate to="/signin" />)} />
        <Route path="/update-profile" element={isAuthenticated ? (<UpdateProfile />) : (<Navigate to="/signin" />)} />
        <Route path="/update-password" element={isAuthenticated ? (<UpdatePassword />) : (<Navigate to="/signin" />)} />
        <Route path="/listes-des-livres" element={<Books />} />
        <Route path="/" element={<Home />} />

        {/* 🔒 Routes protégées pour l'admin */}
        <Route path="/admin/dashboard" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ManageUsers /></AdminRoute>} />
        
        {/* 🆕 Routes pour les catégories */}
        <Route path="/admin/categories" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ManageCategories /></AdminRoute>} />
        <Route path="/admin/categories/create" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><CreateCategory /></AdminRoute>} />
        <Route path="/admin/categories/edit/:categoryId" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><EditCategory /></AdminRoute>} />
        <Route path="/admin/categories/view/:categoryId" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ViewCategory /></AdminRoute>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
