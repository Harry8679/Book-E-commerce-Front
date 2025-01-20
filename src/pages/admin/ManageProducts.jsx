import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('_id');
  const [order, setOrder] = useState('asc');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8008/api/v1/products?search=${search}&sortBy=${sortBy}&order=${order}`
      );
      setProducts(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des produits :', err);
      toast.error('Impossible de récupérer les produits.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, sortBy, order]);

  const handleDelete = async (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8008/api/v1/products/${productId}/${JSON.parse(localStorage.getItem('user'))._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Produit supprimé avec succès.');
        setProducts(products.filter((product) => product._id !== productId));
      } catch (err) {
        console.error('Erreur lors de la suppression :', err);
        toast.error('Erreur lors de la suppression du produit.');
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-teal-600">Gestion des Produits</h1>
        <button
          onClick={() => navigate('/admin/products/create')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ajouter un Produit
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="_id">Par défaut</option>
          <option value="name">Nom</option>
          <option value="price">Prix</option>
          <option value="sold">Produits vendus</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="asc">Ascendant</option>
          <option value="desc">Descendant</option>
        </select>
        <button
          onClick={fetchProducts}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Appliquer
        </button>
      </div>

      {loading ? (
        <p>Chargement des produits...</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Prix</th>
              <th className="py-2 px-4 border-b">Catégorie</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="py-2 px-4 border-b">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <span>Pas d'image</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.price} €</td>
                <td className="py-2 px-4 border-b">{product.category?.name || 'N/A'}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => navigate(`/admin/products/view/${product._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageProducts;