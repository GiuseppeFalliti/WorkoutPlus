import React from 'react';

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Benvenuto in WorkoutPlus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">I tuoi programmi</h2>
          <p className="text-gray-600">
            Gestisci e crea i tuoi programmi di allenamento personalizzati
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Esercizi</h2>
          <p className="text-gray-600">
            Accedi al catalogo completo degli esercizi disponibili
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
