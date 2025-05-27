import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import React from 'react';
import { FaUserCircle, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProgramList = ({ programs, onProgramDeleted }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Search and Filter Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Lista Programmi</h2>
        </div>
      </div>

      {/* Tabella Header */}
      <div className="grid grid-cols-7 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
        <div className="col-span-2">Programma</div>
        <div>Tipo</div>
        <div>Livello</div>
        <div>Tipologia</div>   
        <div>Azioni</div>
      </div>

      {/* Tabella */}
      <div className="divide-y">
        {programs.map((program) => (
          <div
            key={program.id}
            className="grid grid-cols-7 gap-4 p-4 hover:bg-gray-50"
          >
            {/* Nome Programma */}
            <div 
              className="col-span-2 flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate(`/programmi/${program.id}`)}
            >
              <FaUserCircle className="text-gray-400" />
              <span>{program.name}</span>
            </div>
            {/* Tipo */}
            <div 
              className="cursor-pointer"
              onClick={() => navigate(`/programmi/${program.id}`)}
            >
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {program.type}
              </span>
            </div>
            {/* Livello */}
            <div 
              className="cursor-pointer"
              onClick={() => navigate(`/programmi/${program.id}`)}
            >{program.level}</div>
            {/* Tipologia */}
            <div 
              className="cursor-pointer"
              onClick={() => navigate(`/programmi/${program.id}`)}
            >{program.category}</div>
            {/* Azioni */}
            <div>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (window.confirm('Sei sicuro di voler eliminare questo programma?')) {
                    try {
                      await axios.delete(`${API_BASE_URL}/api/programmi/${program.id}`);
                      onProgramDeleted(program.id);
                    } catch (error) {
                      console.error('Error:', error);
                    }
                  }
                }}
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
                title="Elimina programma"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>      
    </div>
  );
};

export default ProgramList;
