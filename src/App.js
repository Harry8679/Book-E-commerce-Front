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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Vérifiez le statut de connexion à partir de localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    let storedUser = null;
    try {
      const userData = localStorage.getItem('user');
      storedUser = userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Erreur lors du parsing de 'user' depuis localStorage :", error);
      localStorage.removeItem('user');  // Supprime les données corrompues
    }
    setIsAuthenticated(authStatus);
    setUserRole(storedUser?.role);
  }, []);

  // Fonction pour se connecter
  const login = (user) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
    setUserRole(user.role);
  };
  
  // Fonction pour se déconnecter
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole(null);
  };

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

        {/* Routes Admin protégées */}
        <Route path="/admin/dashboard" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ManageUsers /></AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ManageCategories /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><ManageProducts /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
