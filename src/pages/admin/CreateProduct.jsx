import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8008/api/v1/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('photo', photo);

    try {
      await axios.post('http://localhost:8008/api/v1/products/create/adminId', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Produit ajouté avec succès');
    } catch (err) {
      console.error('Erreur lors de l\'ajout du produit:', err);
    }
  };

  return (
    <div>
      <h1>Ajouter un Produit</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <select onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Choisir une catégorie</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateProduct;
