import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PayPalButton from '../components/PayPalButton';
// import PayPalButton from './PayPalButton'; // Importation du bouton PayPal personnalisé

const Cart = ({ cartItems, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // Gérer le mode de paiement (PayPal ou carte bancaire)
  const [isPayPalLoading, setIsPayPalLoading] = useState(false);

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

  // Fonction pour créer une commande
  const createOrder = async (method) => {
    const products = cartItems.map((item) => ({
      product: item._id,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const response = await axios.post(
        'http://localhost:8008/api/v1/orders/create',
        {
          products,
          totalPrice,
          paymentMethod: method,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Commande créée avec succès :', response.data);

      // Mise à jour du mode de paiement
      setPaymentMethod(method);

      // Naviguer vers la page de confirmation de paiement ou la page suivante
      if (method === 'paypal') {
        setIsPayPalLoading(true); // Activer le chargement de PayPal
      } else if (method === 'card') {
        navigate('/checkout/card', { state: { amount: totalPrice * 100 } });
      }

      closeModal(); // Fermer le modal après avoir créé la commande
    } catch (error) {
      console.error('Erreur lors de la création de la commande :', error);
      alert('Une erreur est survenue lors de la création de la commande.');
    }
  };

  // Gestion du paiement PayPal réussi
  const handlePayPalSuccess = () => {
    alert('Paiement PayPal réussi !');
    navigate('/my-orders', { state: { successMessage: 'Commande payée avec succès !' } });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Votre Panier</h1>
      {cartItems.length > 0 ? (
        <>
          <table className="min-w-full bg-white mt-6 text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 w-1/6">Image</th>
                <th className="py-2 px-4 w-1/4">Nom</th>
                <th className="py-2 px-4 w-1/6">Prix</th>
                <th className="py-2 px-4 w-1/6">Quantité</th>
                <th className="py-2 px-4 w-1/6">Total</th>
                <th className="py-2 px-4 w-1/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-2 px-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.price} €</td>
                  <td className="py-2 px-4 flex items-center">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="py-2 px-4">{(item.price * item.quantity).toFixed(2)} €</td>
                  <td className="py-2 px-4">
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
                    onClick={() => createOrder('paypal')}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                  >
                    Payer avec Paypal
                  </button>
                  <button
                    onClick={() => createOrder('card')}
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

          {/* Bouton PayPal */}
          {paymentMethod === 'paypal' && isPayPalLoading && (
            <div className="mt-6">
              <PayPalButton amount={totalPrice.toFixed(2)} onSuccess={handlePayPalSuccess} />
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