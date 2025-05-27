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

  const handleDeleteWorkout = async (workoutId) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo giorno di allenamento? Tutti gli esercizi associati verranno eliminati.')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/workouts/${workoutId}`);
      loadProgram(); // Ricarica il programma per riflettere l'eliminazione
    } catch (error) {
      console.error('Errore nella cancellazione del giorno:', error);
    }
  };

  if (!program) return <div>Caricamento...</div>;

  return (
    <div className="p-4 lg:pl-72 md:pl-72 sm:pl-24 pl-16">
      {!program ? (
        <div className="text-center">
          <p>Caricamento in corso...</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-6">{program.nome}</h2>
          <div className="text-sm text-gray-600">
            Livello: {program.level} | Tipo: {program.type}
          </div>
        </div>
      )}

      {/* Workouts */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {program?.workouts.map((workout) => (
          <div key={workout.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
            <div className="bg-red-600 text-white p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <h3 className="text-lg font-medium">{workout.name}</h3>
                <div className="flex space-x-2 ml-auto sm:ml-2">
                  <button
                    onClick={() => {
                      const newName = prompt('Modifica nome del giorno', workout.name);
                      if (newName && newName !== workout.name) {
                        handleEditWorkout(workout.id, newName);
                      }
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteWorkout(workout.id)}
                    className="text-white hover:text-gray-200"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedWorkout(workout);
                  setExerciseModalOpen(true);
                }}
                className="text-white bg-red-700 hover:bg-red-800 px-2 py-1 rounded text-sm flex items-center w-full sm:w-auto justify-center sm:justify-start"
              >
                <FaPlus className="mr-1" /> Esercizio
              </button>
            </div>
            <div className="px-3 py-3">
              {workoutExercises[workout.id]?.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-2">Nessun esercizio</p>
              ) : (
                <div className="space-y-2">
                  {workoutExercises[workout.id]?.map((exercise) => (
                    <div key={exercise.id} className="bg-white rounded-lg shadow p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-2">
                          <FaDumbbell className="text-red-600 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{exercise.exercise_name}</h4>
                            <div className="text-xs text-gray-600">
                              Serie: {exercise.sets} | Rep: {exercise.reps}
                              {exercise.weight && ` | ${exercise.weight}kg`}
                              {exercise.rest_time && ` | ${exercise.rest_time}min`}
                            </div>
                            {exercise.notes && (
                              <div className="text-xs text-gray-500 mt-1 truncate">
                                {exercise.notes}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-1 ml-1 flex-shrink-0">
                          <button
                            onClick={() => {
                              setSelectedExercise(exercise);
                              setSelectedWorkout(workout);
                              setEditExerciseModalOpen(true);
                            }}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <FaEdit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteExercise(workout.id, exercise.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/*giorno Button */}
      <button
        onClick={() => setWorkoutModalOpen(true)}
        className="mt-6 w-full py-3 border-2 border-dashed border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center"
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
