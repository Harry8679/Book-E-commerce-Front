import React from 'react';

const Sidebar = ({ setSearch, setSortBy, setOrder, fetchProducts }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-teal-600 mb-4">Filtres</h2>
      <input
        type="text"
        placeholder="Rechercher un livre..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded"
      />
      <select
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded"
      >
        <option value="_id">Par défaut</option>
        <option value="name">Nom</option>
        <option value="price">Prix</option>
        <option value="sold">Produits vendus</option>
      </select>
      <select
        onChange={(e) => setOrder(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded"
      >
        <option value="asc">Ascendant</option>
        <option value="desc">Descendant</option>
      </select>
      <button
        onClick={fetchProducts}
        className="bg-teal-500 text-white px-4 py-2 rounded w-full hover:bg-teal-600"
      >
        Appliquer
      </button>
    </div>
  );
};

export default Sidebar;
