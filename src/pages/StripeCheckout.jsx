import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51QkYSB2RfwNkGwDfMDbWJsQmS5BcIGHypKTNtcCJ9rlbWd3RqZfiCU0wy9nTLVNYOOjaYpB5EjIjySSva6t1EYXx00spFGqQDZ'); // Votre clé publique Stripe

const StripeCheckout = () => {
  const { state } = useLocation(); // Récupérer le montant de l'état de navigation
  const amount = state?.amount;

  if (!amount || isNaN(amount)) {
    return (
      <div className="container mx-auto py-8 mt-20">
        <h1 className="text-3xl font-bold text-center">Erreur</h1>
        <p className="text-center mt-4 text-red-500">Montant invalide ou non spécifié.</p>
      </div>
    );
  }

  return (
    <div className="mt-20"> {/* Ajout de la marge supérieure */}
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
};

export default StripeCheckout;