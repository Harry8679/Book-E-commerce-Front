import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8008/api/v1/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Erreur de récupération du produit :', err);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Détails du Produit</h1>

      <button
        onClick={() => navigate('/admin/products')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
      >
        Retour à la liste des produits
      </button>

      {product ? (
        <div className="bg-white p-6 rounded shadow-md flex flex-col md:flex-row gap-6">
          {/* Colonne pour l'image */}
          <div className="flex-shrink-0">
            <img
              src={`http://localhost:8008/api/v1/products/photo/${productId}`}
              alt={product.name}
              className="w-full md:w-96 h-auto object-cover rounded-lg border"
            />
          </div>

          {/* Colonne pour les infos */}
          <div className="flex-grow">
            <h2 className="text-xl font-bold mb-4">{product.name}</h2>
            <p className="mb-2">
              <strong>Description :</strong> {product.description}
            </p>
            <p className="mb-2">
              <strong>Prix :</strong> {product.price} €
            </p>
            <p className="mb-2">
              <strong>Quantité :</strong> {product.quantity}
            </p>
            <p className="mb-2">
              <strong>Catégorie :</strong> {product.category?.name || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Expédition :</strong> {product.shipping ? 'Oui' : 'Non'}
            </p>
          </div>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ViewProduct;