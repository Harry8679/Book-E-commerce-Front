import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const { data } = await axios.post('http://localhost:8008/api/v1/orders/payments/stripe', { amount });

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    setIsProcessing(false);

    if (result.error) {
      console.error(result.error.message);
      alert('Erreur de paiement');
    } else {
      alert('Paiement réussi');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={isProcessing}
        className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        {isProcessing ? 'Traitement...' : 'Payer'}
      </button>
    </form>
  );
};

export default CheckoutForm;