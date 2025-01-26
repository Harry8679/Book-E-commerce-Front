import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const PayPalButton = ({ amount, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    const loadPayPal = async () => {
      if (!window.paypal) {
        console.error("PayPal SDK non chargé.");
        return;
      }

      window.paypal.Buttons({
        createOrder: async () => {
          try {
            const { data } = await axios.post('http://localhost:8008/api/v1/orders/create-paypal-order', {
              amount,
            });
            return data.id; // Renvoie l'ID de commande PayPal
          } catch (error) {
            console.error('Erreur lors de la création de l\'order PayPal :', error);
            throw new Error('Erreur lors de la création de l\'order PayPal.');
          }
        },
        onApprove: async (data) => {
          try {
            const { orderId } = data;
            const response = await axios.post('http://localhost:8008/api/v1/orders/capture-paypal-order', {
              orderId,
            });
            console.log('Paiement capturé avec succès :', response.data);
            onSuccess();
          } catch (error) {
            console.error('Erreur lors de la capture du paiement :', error);
          }
        },
        onError: (err) => {
          console.error('Erreur PayPal :', err);
        },
      }).render(paypalRef.current);
    };

    loadPayPal();
  }, [amount, onSuccess]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;