import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51QkYSB2RfwNkGwDfMDbWJsQmS5BcIGHypKTNtcCJ9rlbWd3RqZfiCU0wy9nTLVNYOOjaYpB5EjIjySSva6t1EYXx00spFGqQDZ'); // Utilisez votre clé publique

const StripeCheckout = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default StripeCheckout;
