import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifiez le statut de connexion à partir de localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  // Fonction pour se connecter
  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />
      <Routes>
        <Route
          path="/signin"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Signin login={login} />
            )
          }
        />
        <Route path="/signup" element={ isAuthenticated ? (<Navigate to="/" />) : (<Signup />)}/>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
