import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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
      {product ? (
        <div className="bg-white p-6 rounded shadow-md">
          <p><strong>Nom :</strong> {product.name}</p>
          <p><strong>Description :</strong> {product.description}</p>
          <p><strong>Prix :</strong> {product.price} €</p>
          <p><strong>Quantité :</strong> {product.quantity}</p>
          <p><strong>Catégorie :</strong> {product.category?.name || 'N/A'}</p>
          <p><strong>Expédition :</strong> {product.shipping ? 'Oui' : 'Non'}</p>
          <img
            src={`http://localhost:8008/api/v1/products/photo/${productId}`}
            alt={product.name}
            className="w-64 h-64 object-cover mt-4"
          />
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ViewProduct;
