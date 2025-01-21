import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  const navigate = useNavigate();

  // Calcul du total de tous les produits
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Votre Panier</h1>
      {cartItems.length > 0 ? (
        <>
          <table className="min-w-full bg-white mt-6">
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price} €</td>
                  <td className="flex items-center">
                    {/* Bouton pour diminuer la quantité */}
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    {/* Bouton pour augmenter la quantité */}
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)} €</td>
                  <td>
                    {/* Bouton pour supprimer complètement l'article */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-between items-center">
            {/* Affichage du total */}
            <p className="text-2xl font-semibold">Total : {totalPrice.toFixed(2)} €</p>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
            >
              Passer à la caisse
            </button>
          </div>
        </>
      ) : (
        <p className="mt-6">Votre panier est vide.</p>
      )}
    </div>
  );
};

export default Cart;