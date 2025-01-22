import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Book from '../components/Book';
import Sidebar from '../components/Sidebar';

const Books = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('_id');
  const [order, setOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fonction pour récupérer les produits avec pagination
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8008/api/v1/products/all/paginated?search=${search}&sortBy=${sortBy}&order=${order}&limit=6&page=${currentPage}`
      );

      console.log('Produits récupérés :', response.data);
      setProducts(response.data.products); // Met à jour la liste des produits
      setTotalPages(response.data.totalPages); // Met à jour le nombre total de pages
    } catch (err) {
      console.error('Erreur lors de la récupération des produits :', err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les produits lors de l'initialisation ou des mises à jour des filtres/pagination
  useEffect(() => {
    fetchProducts();
  }, [search, sortBy, order, currentPage]);

  return (
    <Layout
      title="Books Page"
      description="Découvrez notre large sélection de livres !"
      className="flex gap-8 p-8"
    >
      {/* Barre latérale */}
      <Sidebar
        setSearch={setSearch}
        setSortBy={setSortBy}
        setOrder={setOrder}
        fetchProducts={fetchProducts}
      />

      {/* Liste des produits */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p>Chargement des livres...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Book key={product._id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <p>Aucun produit trouvé.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400 disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="px-4 py-2 bg-gray-100 text-gray-700">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Books;