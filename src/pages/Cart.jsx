import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calcul du total de tous les produits
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
              onClick={openModal}
              className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
            >
              Passer à la caisse
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <h2 className="text-xl font-bold mb-4 text-center">
                  Choisissez votre méthode de paiement
                </h2>
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      navigate('/checkout/paypal');
                      closeModal();
                    }}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                  >
                    Payer avec Paypal
                  </button>
                  <button
                    onClick={() => {
                      navigate('/checkout/card');
                      closeModal();
                    }}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                  >
                    Payer avec Carte Bancaire
                  </button>
                </div>
                <button
                  onClick={closeModal}
                  className="mt-6 w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="mt-6">Votre panier est vide.</p>
      )}
    </div>
  );
};

export default Cart;
