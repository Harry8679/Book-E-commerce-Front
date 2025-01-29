import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductComments from '../components/ProductComments';

const ProductDetails = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [userHasPurchased, setUserHasPurchased] = useState(false); // Vérification d'achat
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("Impossible de charger le produit.");
      } finally {
        setLoading(false);
      }
    };

    const checkIfUserHasPurchased = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
    
        const response = await axios.get(`http://localhost:8008/api/v1/orders/user-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        console.log("Réponse API des commandes:", response.data); // <-- Ajout du log
    
        const userOrders = response.data.orders;
    
        console.log("ID du produit à vérifier:", productId); // <-- Ajout du log
    
        const hasPurchased = userOrders.some(order =>
          order.products.some(item => {
            console.log("Comparaison:", item.product._id, "vs", productId); // <-- Ajout du log
            return item.product._id.toString() === productId.toString();
          })
        );
    
        console.log("Résultat de hasPurchased:", hasPurchased); // <-- Ajout du log
    
        setUserHasPurchased(hasPurchased);
      } catch (error) {
        console.error("Erreur lors de la vérification des achats :", error);
      }
    };
    

    fetchProduct();
    checkIfUserHasPurchased();
  }, [productId]);

  if (loading) return <p className="text-center mt-6">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8">
      {product && (
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
      )}

      {/* Section des commentaires */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Avis des clients</h2>
        <ProductComments productId={productId} userHasPurchased={userHasPurchased} />
      </div>
    </div>
  );
};

export default ProductDetails;