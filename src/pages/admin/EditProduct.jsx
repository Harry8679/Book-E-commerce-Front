import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8008/api/v1/products/${productId}`);
      setProduct(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement du produit:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    if (photo) formData.append('photo', photo);

    try {
      await axios.put(`http://localhost:8008/api/v1/products/${productId}/adminId`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Produit mis à jour avec succès');
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
    }
  };

  return (
    <div>
      <h1>Modifier le Produit</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={product.name || ''} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        <textarea value={product.description || ''} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
        <input type="number" value={product.price || ''} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default EditProduct;
