import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError('');
    setPaymentSuccess(false);

    try {
      // Créez un PaymentIntent via l'API backend
      const { data } = await axios.post(
        'http://localhost:8008/api/v1/orders/payments/stripe',
        { amount }, // Montant en centimes
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajoutez l'authentification si nécessaire
          },
        }
      );

      const cardElement = elements.getElement(CardElement);

      // Confirmez le paiement avec Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        console.error('Erreur de paiement :', result.error.message);
        setPaymentError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        alert('Paiement réussi !');
      }
    } catch (error) {
      console.error('Erreur lors de la création du PaymentIntent :', error);
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
        {/* <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-teal-500 text-white px-6 py-2 mt-4 rounded hover:bg-teal-600"
        >
          {isProcessing ? 'Traitement...' : `Payer ${(amount / 100).toFixed(2)} €`}
        </button> */}
      </form>
      {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
      {paymentSuccess && <p className="text-green-500 mt-4">Paiement réussi !</p>}
    </div>
  );
};

export default CheckoutForm;