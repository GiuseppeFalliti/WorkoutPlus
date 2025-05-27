import axios from 'axios';
import { useState, useEffect } from 'react';
import ProgramList from './components/ProgramList';
import CreateProgramModal from './components/CreateProgramModal';
import { FaPlus } from 'react-icons/fa';
import { API_BASE_URL } from '../../config';

const Programmi = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programs, setPrograms] = useState([]);

  // Carica i programmi all'avvio del componente
  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/programmi`);
      if (response.data) {
        setPrograms(response.data);
      }
    } catch (error) {
      console.error('Errore nel caricamento dei programmi:', error);
    }
  };

  const handleCreazioneProgramma = (newProgram) => {
    setPrograms(prevPrograms => [...prevPrograms, newProgram]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Programmi</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span> Nuovo Programma
        </button>
      </div>

      {/* Lista Programmi */}
      <ProgramList 
        programs={programs} 
        onProgramDeleted={(deletedId) => {
          setPrograms(prevPrograms => prevPrograms.filter(program => program.id !== deletedId));
        }} 
      />

      {/* Creazione Programma */}
      {isModalOpen && (
        <CreateProgramModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreazioneProgramma}
        />
      )}
    </div>
  );
};

export default Programmi;
