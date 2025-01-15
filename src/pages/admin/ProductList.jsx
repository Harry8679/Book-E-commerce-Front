import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8008/api/v1/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des produits:', err);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Voulez-vous supprimer ce produit ?')) {
      try {
        await axios.delete(`http://localhost:8008/api/v1/products/${productId}/adminId`);
        fetchProducts();
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
      }
    }
  };

  return (
    <div>
      <h1>Liste des Produits</h1>
      <Link to="/create-product">Ajouter un Produit</Link>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - {product.price} €
            <Link to={`/edit-product/${product._id}`}>Modifier</Link>
            <button onClick={() => handleDelete(product._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
