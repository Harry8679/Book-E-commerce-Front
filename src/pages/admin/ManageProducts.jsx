import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8008/api/v1/products/all');
        setProducts(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        toast.error('Impossible de récupérer les produits.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Gestion des Produits</h1>

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
                  {product.photo ? (
                    <img
                      src={`data:${product.photo.contentType};base64,${btoa(
                        String.fromCharCode(...new Uint8Array(product.photo.data.data))
                      )}`}
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
