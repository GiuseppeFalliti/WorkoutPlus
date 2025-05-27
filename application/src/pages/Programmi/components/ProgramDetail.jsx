import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { FaPlus, FaDumbbell, FaTrash, FaEdit } from 'react-icons/fa';
import AddWorkoutModal from './AddWorkoutModal';
import AddExerciseModal from './AddExerciseModal';
import EditExerciseModal from './EditExerciseModal';

const ProgramDetail = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [isWorkoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [isExerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [isEditExerciseModalOpen, setEditExerciseModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workoutExercises, setWorkoutExercises] = useState({});

  useEffect(() => {
    loadProgram();  
  }, [id]);

  useEffect(() => {
    if (program?.workouts) {
      program.workouts.forEach(workout => {
        loadWorkoutExercises(workout.id);
      });
    }
  }, [program]);

  const loadProgram = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/programmi/${id}`);
      setProgram(response.data);
    } catch (error) {
      console.error('Errore nel caricamento del programma:', error);
    }
  };

  const loadWorkoutExercises = async (workoutId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/workouts/${workoutId}/exercises`);
      setWorkoutExercises(prev => ({
        ...prev,
        [workoutId]: response.data
      }));
    } catch (error) {
      console.error('Errore nel caricamento degli esercizi:', error);
    }
  };

  const handleEditWorkout = async (workoutId, newName) => {
    try {
      await axios.put(`${API_BASE_URL}/api/workouts/${workoutId}`, { name: newName });
      loadProgram(); // Ricarica il programma per mostrare il nome aggiornato
    } catch (error) {
      console.error('Errore nella modifica del workout:', error);
    }
  };

  const handleEditExercise = async (workoutId, exerciseId, exerciseData) => {
    try {
      await axios.put(`${API_BASE_URL}/api/workouts/${workoutId}/exercises/${exerciseId}`, exerciseData);
      loadWorkoutExercises(workoutId); // Ricarica gli esercizi del workout
    } catch (error) {
      console.error('Errore nella modifica dell\'esercizio:', error);
    }
  };

  const handleAddWorkout = async (workoutData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/programmi/${id}/workouts`, workoutData);
      loadProgram(); // Ricarica il programma per mostrare il nuovo workout
      setWorkoutModalOpen(false);
    } catch (error) {
      console.error('Errore nell\'aggiunta del workout:', error);
    }
  };

  const handleAddExercise = async (exerciseData) => {
    if (!selectedWorkout) return;
    
    try {
      await axios.post(`${API_BASE_URL}/api/workouts/${selectedWorkout.id}/exercises`, exerciseData);
      await loadWorkoutExercises(selectedWorkout.id);
      setExerciseModalOpen(false);
      setSelectedWorkout(null);
    } catch (error) {
      console.error('Errore nell\'aggiunta dell\'esercizio:', error);
    }
  };

  const handleDeleteExercise = async (workoutId, exerciseId) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo esercizio?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/workout-exercises/${exerciseId}`);
      await loadWorkoutExercises(workoutId);
    } catch (error) {
      console.error('Errore nella cancellazione dell\'esercizio:', error);
    }
  };

  if (!program) return <div>Caricamento...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">{program.name}</h1>
          <div className="text-sm text-gray-600">
            Livello: {program.level} | Tipo: {program.type}
          </div>
        </div>
      </div>

      {/* Weeks Tabs */}
      <div className="mb-8">
        <div className="border-b flex">
          {[1].map((week) => (
            <button
              key={week}
              className="px-6 py-2 border-b-2 border-red-600 text-red-600"
            >
              Settimana {week}
            </button>
          ))}
        </div>
      </div>

      {/* Workouts */}
      {program.workouts?.map((workout) => (
        <div key={workout.id} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">
                Giorno {workout.day_number}: {workout.name}
                
              </h3>
              <button
                onClick={() => {
                  const newName = prompt('Inserisci il nuovo nome del workout:', workout.name);
                  if (newName) handleEditWorkout(workout.id, newName);
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaEdit className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => {
                setSelectedWorkout(workout);
                setExerciseModalOpen(true);
              }}
              className="text-red-600 hover:text-red-700 flex items-center"
            >
              <FaPlus className="mr-2" /> Esercizio
            </button>
          </div>
          <div className="container mx-auto px-4 py-4 md:py-8">
            {workoutExercises[workout.id]?.map((exercise) => (
              <div key={exercise.id} className="bg-white rounded-lg shadow-lg p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <FaDumbbell className="text-red-600" />
                    <div>
                      <h4 className="font-medium">{exercise.exercise_name}</h4>
                      <div className="text-sm text-gray-600">
                        Serie: {exercise.sets} | Ripetizioni: {exercise.reps}
                        {exercise.weight && ` | Peso: ${exercise.weight}kg`}
                        {exercise.rest_time && ` | Recupero: ${exercise.rest_time}min`}
                      </div>
                      {exercise.notes && (
                        <div className="text-sm text-gray-500 mt-1">
                          Note: {exercise.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedExercise(exercise);
                        setSelectedWorkout(workout);
                        setEditExerciseModalOpen(true);
                      }}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExercise(workout.id, exercise.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/*giorno Button */}
      <button
        onClick={() => setWorkoutModalOpen(true)}
        className="mt-4 w-full py-3 border-2 border-dashed border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center"
      >
        <FaPlus className="mr-2" /> Aggiungi giorno
      </button>

      {/* Modals */}
      {isWorkoutModalOpen && (
        <AddWorkoutModal
          isOpen={isWorkoutModalOpen}
          onClose={() => setWorkoutModalOpen(false)}
          onSubmit={handleAddWorkout}
        />
      )}

      {isExerciseModalOpen && (
        <AddExerciseModal
          isOpen={isExerciseModalOpen}
          onClose={() => {
            setExerciseModalOpen(false);
            setSelectedWorkout(null);
          }}
          onSubmit={handleAddExercise}
          workoutId={selectedWorkout?.id}
        />
      )}

      {isEditExerciseModalOpen && (
        <EditExerciseModal
          isOpen={isEditExerciseModalOpen}
          onClose={() => setEditExerciseModalOpen(false)}
          exercise={selectedExercise}
          onSubmit={(exerciseData) => {
            handleEditExercise(selectedWorkout.id, selectedExercise.id, exerciseData);
            setEditExerciseModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProgramDetail;
