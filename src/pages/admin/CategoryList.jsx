import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

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

  return (
    <div>
      <h1>Liste des Catégories</h1>
      <ul>
        {categories.map(category => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
