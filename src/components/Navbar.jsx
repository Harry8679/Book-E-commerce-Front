import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-bold">
              <NavLink
                to="/"
                className="text-teal-400"
              >
                Mon Logo
              </NavLink>
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-400 border-b-2 border-teal-400"
                  : "hover:text-teal-400 transition duration-300"
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/listes-des-livres"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-400 border-b-2 border-teal-400"
                  : "hover:text-teal-400 transition duration-300"
              }
            >
              Liste des livres
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 bg-teal-600 rounded"
                  : "px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 transition duration-300"
              }
            >
              Inscription
            </NavLink>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 border border-teal-500 bg-teal-500 text-white rounded"
                  : "px-4 py-2 border border-teal-500 rounded hover:bg-teal-500 hover:text-white transition duration-300"
              }
            >
              Connexion
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;