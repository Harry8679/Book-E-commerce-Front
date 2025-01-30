import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetailsAdmin = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

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
      setError('Une erreur est survenue lors du chargement des détails.');
    }
  };

  if (error) {
    return <p className="text-center text-red-500 mt-6">{error}</p>;
  }

  if (!order) {
    return <p className="text-center mt-6">Chargement des détails de la commande...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Détails de la Commande</h1>
      <p><strong>ID de la Commande :</strong> {order._id}</p>
      <p><strong>Utilisateur :</strong> {order.user?.email || 'N/A'}</p>
      <p><strong>Total :</strong> {order.totalPrice.toFixed(2)} €</p>
      <p><strong>Date :</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <h2 className="text-2xl font-bold mt-6">Produits :</h2>
      <ul className="list-disc ml-6">
        {order.products.map((item, index) => (
          <li key={index}>
            {item.product.name} - {item.quantity} × {item.price.toFixed(2)} €
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailsAdmin;