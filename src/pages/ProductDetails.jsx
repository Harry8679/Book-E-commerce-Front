import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8008/api/v1/products/${productId}`);
        const productData = response.data;

        // Générer l'URL de l'image si elle n'est pas présente
        if (!productData.imageUrl) {
          productData.imageUrl = `http://localhost:8008/api/v1/products/photo/${productData._id}`;
        }

        setProduct(productData);
      } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <div className="container mx-auto py-8">
      {product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-96">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-4">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold text-teal-500">{product.price} €</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ProductDetails;
