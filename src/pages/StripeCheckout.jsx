import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51QkYSB2RfwNkGwDfMDbWJsQmS5BcIGHypKTNtcCJ9rlbWd3RqZfiCU0wy9nTLVNYOOjaYpB5EjIjySSva6t1EYXx00spFGqQDZ'); // Votre clé publique Stripe

const StripeCheckout = ({ amount }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Paiement par Carte Bancaire</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
};

export default StripeCheckout;