import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8008/api/v1/orders/my-orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error('Erreur lors du chargement des commandes:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Chargement des commandes...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      {state?.successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {state.successMessage}
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">Mes Commandes</h1>
      {orders.length === 0 ? (
        <p className="text-center">Aucune commande trouvée.</p>
      ) : (
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID de la Commande</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Statut</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{order.totalPrice.toFixed(2)} €</td>
                <td className="border border-gray-300 px-4 py-2">{order.isPaid ? 'Payée' : 'Non payée'}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    to={`/order-details/${order._id}`}
                    className="text-teal-500 hover:underline"
                  >
                    Voir détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrders;