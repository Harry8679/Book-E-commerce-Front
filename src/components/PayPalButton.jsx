import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const PayPalButton = ({ amount, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    // Vérifiez si le SDK PayPal est chargé
    const checkPayPalSDK = () => {
      if (!window.paypal) {
        console.error("PayPal SDK non chargé.");
        return false;
      }
      return true;
    };

    const loadPayPalButton = async () => {
      if (!checkPayPalSDK()) return;

      window.paypal.Buttons({
        createOrder: async () => {
          try {
            const { data } = await axios.post('http://localhost:8008/api/v1/orders/create-paypal-order', {
              amount,
            });
            return data.id; // Renvoie l'ID de commande PayPal
          } catch (error) {
            console.error("Erreur lors de la création de l'ordre PayPal :", error);
            throw new Error("Erreur lors de la création de l'ordre PayPal.");
          }
        },
        onApprove: async (data) => {
          try {
            const response = await axios.post('http://localhost:8008/api/v1/orders/capture-paypal-order', {
              orderId: data.orderID,
            });
            console.log("Paiement capturé avec succès :", response.data);
            onSuccess();
          } catch (error) {
            console.error("Erreur lors de la capture du paiement :", error);
          }
        },
        onError: (err) => {
          console.error("Erreur PayPal :", err);
        },
      }).render(paypalRef.current);
    };

    loadPayPalButton();
  }, [amount, onSuccess]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;