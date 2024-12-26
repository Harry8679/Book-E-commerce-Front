import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-bold">
              <a href="/" className="text-teal-400">
                Mon Logo
              </a>
            </div>
            <a
              href="#accueil"
              className="hover:text-teal-400 transition duration-300"
            >
              Accueil
            </a>
            <a
              href="#listes-des-livres"
              className="hover:text-teal-400 transition duration-300"
            >
              Liste des livres
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <a
              href="#inscription"
              className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 transition duration-300"
            >
              Inscription
            </a>
            <a
              href="#connexion"
              className="px-4 py-2 border border-teal-500 rounded hover:bg-teal-500 hover:text-white transition duration-300"
            >
              Connexion
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;