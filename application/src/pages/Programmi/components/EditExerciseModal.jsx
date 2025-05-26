import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const EditExerciseModal = ({ isOpen, onClose, exercise, onSubmit }) => {
  const [exerciseData, setExerciseData] = useState({
    sets: '',
    reps: '',
    weight: '',
    restTime: '',
    notes: ''
  });

  useEffect(() => {
    if (exercise) {
      setExerciseData({
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight || '',
        restTime: exercise.rest_time || '',
        notes: exercise.notes || ''
      });
    }
  }, [exercise]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(exerciseData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Modifica Esercizio</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serie*
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
              Ripetizioni*
            </label>
            <input
              type="text"
              value={exerciseData.reps}
              onChange={(e) => setExerciseData({ ...exerciseData, reps: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="es. 12 o 10-12"
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
              className="w-full p-2 border rounded-lg min-h-[100px]"
              placeholder="Aggiungi note sull'esercizio..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-red-600 hover:text-red-700"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Salva Modifiche
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExerciseModal;
