import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutForm = ({ amount, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError('');
    setPaymentSuccess(false);

    try {
      // Étape 1 : Créer un PaymentIntent via l'API backend
      const { data } = await axios.post(
        'http://localhost:8008/api/v1/orders/payments/stripe',
        { amount, orderId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Authentification
          },
        }
      );

      const cardElement = elements.getElement(CardElement);

      // Vérifiez si le CardElement est disponible
      if (!cardElement) {
        setPaymentError('Erreur lors de la récupération des informations de carte.');
        setIsProcessing(false);
        return;
      }

      // Étape 2 : Confirmer le paiement avec Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        // Gestion des erreurs de paiement
        console.error('Erreur de paiement :', result.error.message);
        setPaymentError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Paiement réussi

        // Étape 3 : Mettre à jour le statut `isPaid` dans la commande
        await axios.put(
          `http://localhost:8008/api/v1/orders/${orderId}/pay`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Authentification
            },
          }
        );

        // Mettre à jour l'état de succès
        setPaymentSuccess(true);

        // Afficher une alerte et rediriger l'utilisateur
        alert('Paiement réussi et commande mise à jour !');
        navigate('/my-orders', { state: { successMessage: 'Commande payée avec succès !' } });
      }
    } catch (error) {
      console.error('Erreur lors du paiement :', error);
      setPaymentError('Une erreur est survenue lors du paiement.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-4 border rounded-md" />
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-teal-500 text-white px-6 py-2 mt-4 rounded hover:bg-teal-600"
        >
          {isProcessing ? 'Traitement...' : `Payer ${(amount / 100).toFixed(2)} €`}
        </button>
      </form>
      {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
      {paymentSuccess && <p className="text-green-500 mt-4">Paiement réussi !</p>}
    </div>
  );
};

export default CheckoutForm;
