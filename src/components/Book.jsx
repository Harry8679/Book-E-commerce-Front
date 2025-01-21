import React from 'react';
import { useNavigate } from 'react-router-dom';
// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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
          {/* Icon for adding to cart */}
          <button
            onClick={() => addToCart(product)}
            className="text-teal-500 hover:text-teal-600"
          >
            <FontAwesomeIcon icon={faCartPlus} className="text-xl" />
          </button>

          {/* Icon for product details */}
          <button
            onClick={() => navigate(`/books/${product._id}`)}
            className="text-blue-500 hover:text-blue-600"
          >Voir <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;