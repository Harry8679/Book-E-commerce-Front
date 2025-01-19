import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewCategory = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get(`http://localhost:8008/api/v1/categories/${categoryId}`);
      setCategory(response.data);
    };
    fetchCategory();
  }, [categoryId]);

  return (
    <div>
      <h1>Nom de la Catégorie : {category.name}</h1>
    </div>
  );
};

export default ViewCategory;