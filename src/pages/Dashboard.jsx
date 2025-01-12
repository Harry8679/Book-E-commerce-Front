import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">Tableau de Bord</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Nombre de Livres</h2>
          <p className="text-2xl font-bold text-teal-500">42</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Commandes Récentes</h2>
          <p className="text-2xl font-bold text-teal-500">7</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Messages Non Lus</h2>
          <p className="text-2xl font-bold text-teal-500">3</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
