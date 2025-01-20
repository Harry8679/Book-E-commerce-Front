import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
  const { productId } = useParams(); // Récupérer l'ID du produit depuis l'URL
  const [product, setProduct] = useState({ name: '', description: '', price: '', quantity: '', category: '', shipping: false });
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8008/api/v1/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Erreur de récupération des catégories :', err);
        toast.error('Impossible de récupérer les catégories.');
      }
    };

    fetchCategories();
  }, []);

  // Charger les données du produit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8008/api/v1/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Erreur de récupération du produit :', err);
        toast.error("Impossible de récupérer les données du produit.");
      }
    };

    fetchProduct();
  }, [productId]);

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

      await axios.put(
        `http://localhost:8008/api/v1/products/${productId}/${JSON.parse(localStorage.getItem('user'))._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Produit mis à jour avec succès !');
      navigate('/admin/products');
    } catch (err) {
      console.error('Erreur lors de la mise à jour du produit :', err);
      toast.error('Erreur lors de la mise à jour du produit.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Modifier le Produit</h1>

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
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
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

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Mettre à jour le produit
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Retour à la liste
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;