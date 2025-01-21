import React from 'react';
import { useNavigate } from 'react-router-dom';

const Book = ({ product, addToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-full h-48 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600">{product.description.substring(0, 25)}...</p>
        <p className="text-teal-500 font-semibold">{product.price} €</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
          >
            <i className="fas fa-cart-plus mr-2"></i> Ajouter au panier
          </button>
          <button
            onClick={() => navigate(`/books/${product._id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            <i className="fas fa-info-circle mr-2"></i> Voir détails
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;