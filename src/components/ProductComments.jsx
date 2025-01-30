import React, { useState } from 'react';
import axios from 'axios';

const ProductComments = ({ productId, userHasPurchased }) => {
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      console.log('token', token);
      const response = await axios.post(
        `http://localhost:8008/api/v1/product/${productId}/comment`,
        { text: commentText, rating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments([response.data.comment, ...comments]);
      setCommentText('');
      setRating(1);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire :', error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Avis des clients</h3>

      {/* Affichage des commentaires existants */}
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

      {/* Formulaire pour ajouter un commentaire (visible uniquement si l'utilisateur a acheté le produit) */}
      {userHasPurchased && (
        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows="4"
            className="w-full p-2 border rounded"
            placeholder="Laissez votre commentaire..."
            required
          />
          <div className="mt-2">
            <label htmlFor="rating">Note: </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="ml-2 p-1"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} ⭐
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
          >
            Ajouter un commentaire
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductComments;