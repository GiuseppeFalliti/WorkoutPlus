import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddWorkoutModal = ({ isOpen, onClose, onSubmit }) => {
  const [workoutData, setWorkoutData] = useState({
    name: '',
    dayNumber: '',
    weekNumber: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(workoutData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nuovo workout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giorno
            </label>
            <select
              value={workoutData.dayNumber}
              onChange={(e) => setWorkoutData({ ...workoutData, dayNumber: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Seleziona giorno</option>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <option key={day} value={day}>
                  Giorno {day}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome workout
            </label>
            <input
              type="text"
              value={workoutData.name}
              onChange={(e) => setWorkoutData({ ...workoutData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="Inserisci nome workout"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Conferma
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWorkoutModal;
