import React, { useState, useEffect } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';

const AddExerciseModal = ({ isOpen, onClose, onSubmit, workoutId }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [exerciseData, setExerciseData] = useState({
    sets: '',
    reps: '',
    weight: '',
    restTime: '',
    notes: ''
  });

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/exercises`);
      setExercises(response.data);
    } catch (error) {
      console.error('Errore nel caricamento degli esercizi:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedExercise) return;

    onSubmit({
      exerciseId: selectedExercise.id,
      ...exerciseData,
      orderIndex: 0 
    });
  };

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Aggiungi Esercizio</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Cerca esercizio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* lista esercizi */}
          <div className="bg-white rounded-lg p-4 md:p-6 w-full md:w-[800px] max-h-[90vh] overflow-y-auto relative">
            <div className="space-y-2">
              {filteredExercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => setSelectedExercise(exercise)}
                  className={`w-full p-3 rounded-lg text-left flex items-center space-x-3 ${
                    selectedExercise?.id === exercise.id
                      ? 'bg-red-100 text-red-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    {/* Placeholder per l'icona dell'esercizio */}
                  </div>
                  <div>
                    <div className="font-medium">{exercise.name}</div>
                    <div className="text-sm text-gray-500">{exercise.type}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Exercise Details Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serie
                </label>
                <input
                  type="number"
                  value={exerciseData.sets}
                  onChange={(e) => setExerciseData({ ...exerciseData, sets: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ripetizioni
                </label>
                <input
                  type="text"
                  value={exerciseData.reps}
                  onChange={(e) => setExerciseData({ ...exerciseData, reps: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="es. 12 o 8-12"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg)
                </label>
                <input
                  type="text"
                  value={exerciseData.weight}
                  onChange={(e) => setExerciseData({ ...exerciseData, weight: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="es. 20 o 15-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recupero (Minuti)
                </label>
                <input
                  type="number"
                  value={exerciseData.restTime}
                  onChange={(e) => setExerciseData({ ...exerciseData, restTime: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note
                </label>
                <textarea
                  value={exerciseData.notes}
                  onChange={(e) => setExerciseData({ ...exerciseData, notes: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedExercise}
                className={`w-full py-2 rounded-lg ${
                  selectedExercise
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Conferma
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExerciseModal;
