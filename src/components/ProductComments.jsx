import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductComments = ({ productId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8008/api/v1/product/${productId}/comments`);
        setComments(data.comments);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
      }
    };

    fetchComments();
  }, [productId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Avis des clients</h3>
      {comments.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {comments.map((comment) => (
            <li key={comment._id} className="border p-4 rounded-md">
              <p className="text-gray-700"><strong>{comment.user.name}</strong></p>
              <p className="text-yellow-500">{"⭐".repeat(comment.rating)}</p>
              <p className="text-gray-600">{comment.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun commentaire pour ce produit.</p>
      )}
    </div>
  );
};

export default ProductComments;