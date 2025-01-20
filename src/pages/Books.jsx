import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Book from '../components/Book';
import Sidebar from '../components/Sidebar';

const Books = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('_id');
  const [order, setOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/v1/products?search=${search}&sortBy=${sortBy}&order=${order}`
      );
      console.log('Produits récupérés :', response.data); // Vérifiez les données ici
      setProducts(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des produits :', err);
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchProducts();
  }, [search, sortBy, order]);

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
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p>Chargement des livres...</p>
        ) : products.length > 0 ? (
          products.map((product) => <Book key={product._id} product={product} />)
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </Layout>
  );
};

export default Books;