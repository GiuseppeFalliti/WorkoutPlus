import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';

const CreateProgramModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    category: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/programmi`, {
        name: formData.name,
        type: 'Programma',
        level: formData.level,
        category: formData.category,
        description: formData.description
      });

      if (response.status === 201) {
        const newProgram = {
          id: response.data.id,
          name: formData.name,
          type: 'Programma',
          level: formData.level,
          category: formData.category,
          weeks: 3,
          client: 'Nessun cliente',
          description: formData.description
        };
        
        onSubmit(newProgram);
        onClose(); // Chiude il modale dopo il successo
      }
    } catch (error) {
      console.error('Errore durante la creazione del programma:', error);
      alert('Errore durante la creazione del programma. Riprova.'); // Mostra un messaggio di errore all'utente
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Crea Programma</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nome Programma */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome Programma*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Nome Programma"
              required
            />
          </div>

          {/* Livello */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Livello*
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">Seleziona livello</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzato">Avanzato</option>
            </select>
          </div>

          {/* Tipologia allenamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipologia allenamento*
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">Seleziona tipologia allenamento</option>
              <option value="Body Building">Body Building</option>
              <option value="Calisthenics">Calisthenics</option>
              <option value="Pugilato">Pugilato</option>
            </select>
          </div>

          {/* Descrizione Programma */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrizione Programma
            </label>
            <div className="border rounded-lg">
              <div className="border-b p-2 flex space-x-2">
                <button type="button" className="p-1 hover:bg-gray-100 rounded">B</button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded italic">I</button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded underline">U</button>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 min-h-[100px] focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Descrizione"
              />
            </div>
          </div>

          {/* Buttons */}
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
              Crea Programma
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProgramModal;
