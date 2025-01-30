import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
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
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-6">Détails de la Commande</h1>

        {/* Informations principales de la commande */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-lg"><strong>ID de la Commande :</strong> <span className="text-teal-500">{order._id}</span></p>
            <p className="text-lg"><strong>Utilisateur :</strong> <span className="text-teal-500">{order.user?.email || 'N/A'}</span></p>
          </div>
          <div>
            <p className="text-lg"><strong>Total :</strong> <span className="text-teal-500">{order.totalPrice.toFixed(2)} €</span></p>
            <p className="text-lg"><strong>Date :</strong> <span className="text-teal-500">{new Date(order.createdAt).toLocaleString()}</span></p>
          </div>
        </div>

        {/* Liste des produits */}
        <h2 className="text-2xl font-bold text-teal-600 mt-6">Produits :</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr className="bg-teal-100">
                <th className="px-4 py-2 text-left text-sm font-semibold">Produit</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Quantité</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Prix Unitaire</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.product.name}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.price.toFixed(2)} €</td>
                  <td className="px-4 py-2">{(item.quantity * item.price).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statut de la commande */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-teal-600">Statut de la Commande :</h3>
          <p className="text-lg text-teal-500">{order.status}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;