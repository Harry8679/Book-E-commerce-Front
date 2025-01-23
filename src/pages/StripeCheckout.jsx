import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51QkYSB2RfwNkGwDfMDbWJsQmS5BcIGHypKTNtcCJ9rlbWd3RqZfiCU0wy9nTLVNYOOjaYpB5EjIjySSva6t1EYXx00spFGqQDZ'); // Votre clé publique Stripe

const StripeCheckout = () => {
  const { state } = useLocation(); // Récupérer le state contenant `amount`

  if (!state?.amount) {
    return <p>Montant invalide ou non spécifié.</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={state.amount} />
    </Elements>
  );
};

export default StripeCheckout;
