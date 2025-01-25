import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { orderId } = useParams(); // Récupère l'ID de la commande à partir de l'URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8008/api/v1/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrder(res.data.order);
    } catch (err) {
      console.error('Erreur lors du chargement des détails de la commande:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Chargement des détails de la commande...</p>;
  }

  if (!order) {
    return <p className="text-center mt-6">Commande introuvable.</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Détails de la Commande</h1>
      <div className="bg-white shadow-md rounded p-6">
        <p><strong>ID de la commande :</strong> {order._id}</p>
        <p><strong>Date :</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Statut de paiement :</strong> {order.isPaid ? 'Payée' : 'Non payée'}</p>
        <p><strong>Total :</strong> {order.totalPrice.toFixed(2)} €</p>
        <p><strong>Méthode de paiement :</strong> {order.paymentMethod}</p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Produits :</h2>
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Prix</th>
              <th className="border border-gray-300 px-4 py-2">Quantité</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item) => (
              <tr key={item.product._id}>
                <td className="border border-gray-300 px-4 py-2">{item.product.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.price.toFixed(2)} €</td>
                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;