import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, logout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Stocker les données utilisateur localement
  const menuRef = useRef(); // Référence pour le menu déroulant

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
  
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUserRole(parsedUser.role);
      } catch (error) {
        console.error("Erreur lors du parsing de 'user' :", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);  

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getUserInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/); // Supprime les espaces en trop
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // const getUserInitials = (name) => {
  //   if (!name) return "";
  //   const parts = name.split(" ");
  //   if (parts.length === 1) return parts[0][0].toUpperCase();
  //   return (parts[0][0] + parts[1][0]).toUpperCase();
  // };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-bold">
              <NavLink to="/" className="text-teal-400">Harry Boutique</NavLink>
            </div>
            <NavLink to="/" className={({ isActive }) =>
              isActive ? "text-teal-400 border-b-2 border-teal-400" : "hover:text-teal-400 transition duration-300"}
            >Accueil</NavLink>
            <NavLink to="/listes-des-livres" className={({ isActive }) =>
              isActive
                ? "text-teal-400 border-b-2 border-teal-400"
                : "hover:text-teal-400 transition duration-300"}
            >Liste des livres</NavLink>

            {/* Lien Admin visible uniquement si l'utilisateur est admin */}
            {isAuthenticated && user?.role === 1 && (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-400 border-b-2 border-teal-400"
                    : "hover:text-teal-400 transition duration-300"
                }
              >
                Admin
              </NavLink>
            )}
          </div>

          {/* Right Section */}
          <div className="relative" ref={menuRef}>
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <NavLink to="/signup" className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 bg-teal-600 rounded"
                    : "px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 transition duration-300"}
                >Inscription</NavLink>
                <NavLink to="/signin" className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 border border-teal-500 bg-teal-500 text-white rounded"
                    : "px-4 py-2 border border-teal-500 rounded hover:bg-teal-500 hover:text-white transition duration-300"}
                >Connexion</NavLink>
              </div>
            ) : (
              <div className="relative">
                {/* User Circle */}
                <div
                  className="w-10 h-10 bg-teal-500 text-white flex items-center justify-center rounded-full cursor-pointer font-bold text-lg"
                  onClick={toggleMenu}
                >
                  {/* {getUserInitials(user?.name || "Ebang Mezui")} */}
                  {user ? getUserInitials(user.name) : ""}
                </div>

                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
                    <ul className="py-2">
                      {user?.role === 1 && (
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => navigate("/admin/dashboard")}
                        >
                          Tableau de Bord Admin
                        </li>
                      )}
                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => navigate("/profile")}
                      >
                        Mon profil
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => navigate("/update-profile")}
                      >
                        Mettre à jour votre profil
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => navigate("/update-password")}
                      >
                        Mettre à jour votre mot de passe
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Déconnexion
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
