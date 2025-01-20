import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    shipping: false,
  });
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Charger toutes les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8008/api/v1/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des catégories :', err);
        toast.error('Impossible de récupérer les catégories.');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.keys(product).forEach((key) => formData.append(key, product[key]));
      if (photo) formData.append('photo', photo);

      await axios.post(
        `http://localhost:8008/api/v1/products/create/${JSON.parse(localStorage.getItem('user'))._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Produit créé avec succès !');
      navigate('/admin/products');
    } catch (err) {
      console.error('Erreur lors de la création :', err);
      toast.error('Erreur lors de la création du produit.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-teal-600">Créer un Produit</h1>
        {/* Bouton retour */}
        <button
          onClick={() => navigate('/admin/products')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Retour
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2">Nom</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Prix</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Quantité</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Catégorie</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">-- Sélectionner une catégorie --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Expédition</label>
          <select
            name="shipping"
            value={product.shipping}
            onChange={(e) => setProduct({ ...product, shipping: e.target.value === 'true' })}
            className="w-full px-4 py-2 border rounded"
          >
            <option value={false}>Non</option>
            <option value={true}>Oui</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Photo</label>
          <input type="file" accept="image/*" onChange={handlePhoto} className="w-full px-4 py-2" />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Créer le produit
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;