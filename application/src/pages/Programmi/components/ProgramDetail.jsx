import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook per accedere ai parametri dell'URL
import axios from 'axios'; // Libreria per chiamate HTTP
import { API_BASE_URL } from '../../../config'; // URL base dell'API
import { FaPlus, FaDumbbell, FaTrash, FaEdit } from 'react-icons/fa'; // Icone
import AddWorkoutModal from './AddWorkoutModal'; // Componente modale
import AddExerciseModal from './AddExerciseModal'; // Componente modale
import EditExerciseModal from './EditExerciseModal'; // Componente modale

const ProgramDetail = () => {
  // Hook per ottenere l'ID del programma dall'URL
  const { id } = useParams();
  
  // Stati del componente:
  const [program, setProgram] = useState(null); // Dettagli del programma
  const [isWorkoutModalOpen, setWorkoutModalOpen] = useState(false); // Controllo modale workout
  const [isExerciseModalOpen, setExerciseModalOpen] = useState(false); // Controllo modale esercizio
  const [isEditExerciseModalOpen, setEditExerciseModalOpen] = useState(false); // Controllo modale modifica esercizio
  const [selectedWorkout, setSelectedWorkout] = useState(null); // Workout selezionato
  const [selectedExercise, setSelectedExercise] = useState(null); // Esercizio selezionato
  const [workoutExercises, setWorkoutExercises] = useState({}); // Mappa esercizi per workout

  // Carica i dettagli del programma quando cambia l'ID
  useEffect(() => {
    loadProgram();  
  }, [id]);

  // Carica gli esercizi per ogni workout quando cambia il programma
  useEffect(() => {
    if (program?.workouts) {
      program.workouts.forEach(workout => {
        loadWorkoutExercises(workout.id);
      });
    }
  }, [program]);

  // Funzione per caricare i dettagli del programma dall'API
  const loadProgram = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/programmi/${id}`);
      setProgram(response.data);
    } catch (error) {
      console.error('Errore nel caricamento del programma:', error);
    }
  };

  // Funzione per caricare gli esercizi di un workout specifico
  const loadWorkoutExercises = async (workoutId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/workouts/${workoutId}/exercises`);
      // Aggiorna la mappa degli esercizi mantenendo gli altri valori
      setWorkoutExercises(prev => ({
        ...prev,
        [workoutId]: response.data
      }));
    } catch (error) {
      console.error('Errore nel caricamento degli esercizi:', error);
    }
  };

  // Funzione per modificare il nome di un workout
  const handleEditWorkout = async (workoutId, newName) => {
    try {
      await axios.put(`${API_BASE_URL}/api/workouts/${workoutId}`, { name: newName });
      loadProgram(); // Ricarica il programma per mostrare il nome aggiornato
    } catch (error) {
      console.error('Errore nella modifica del workout:', error);
    }
  };

  // Funzione per modificare un esercizio
  const handleEditExercise = async (workoutId, exerciseId, exerciseData) => {
    try {
      await axios.put(`${API_BASE_URL}/api/workouts/${workoutId}/exercises/${exerciseId}`, exerciseData);
      loadWorkoutExercises(workoutId); // Ricarica gli esercizi del workout
    } catch (error) {
      console.error('Errore nella modifica dell\'esercizio:', error);
    }
  };

  // Funzione per aggiungere un nuovo workout
  const handleAddWorkout = async (workoutData) => {
    try {
      await axios.post(`${API_BASE_URL}/api/programmi/${id}/workouts`, workoutData);
      loadProgram(); // Ricarica il programma
      setWorkoutModalOpen(false); // Chiudi la modale
    } catch (error) {
      console.error('Errore nell\'aggiunta del workout:', error);
    }
  };

  // Funzione per aggiungere un nuovo esercizio
  const handleAddExercise = async (exerciseData) => {
    if (!selectedWorkout) return;
    
    try {
      await axios.post(`${API_BASE_URL}/api/workouts/${selectedWorkout.id}/exercises`, exerciseData);
      await loadWorkoutExercises(selectedWorkout.id); // Ricarica gli esercizi
      setExerciseModalOpen(false); // Chiudi la modale
      setSelectedWorkout(null); // Resetta il workout selezionato
    } catch (error) {
      console.error('Errore nell\'aggiunta dell\'esercizio:', error);
    }
  };

  // Funzione per eliminare un esercizio
  const handleDeleteExercise = async (workoutId, exerciseId) => {
    // Conferma prima di eliminare
    if (!window.confirm('Sei sicuro di voler eliminare questo esercizio?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/workout-exercises/${exerciseId}`);
      await loadWorkoutExercises(workoutId); // Ricarica gli esercizi
    } catch (error) {
      console.error('Errore nella cancellazione dell\'esercizio:', error);
    }
  };

  // Funzione per eliminare un workout
  const handleDeleteWorkout = async (workoutId) => {
    // Conferma prima di eliminare
    if (!window.confirm('Sei sicuro di voler eliminare questo giorno di allenamento? Tutti gli esercizi associati verranno eliminati.')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/workouts/${workoutId}`);
      loadProgram(); // Ricarica il programma
    } catch (error) {
      console.error('Errore nella cancellazione del giorno:', error);
    }
  };

  // Mostra caricamento durante il fetch dei dati
  if (!program) return <div>Caricamento...</div>;

  return (
    <div className=" md:p-2 md:pl-5 pr-2">
      {/* Intestazione del programma */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-6">{program.nome}</h2>
        <div className="text-xs md:text-sm text-gray-600 mb-2">
          Livello: {program.level} | Tipo: {program.type}
        </div>
      </div>

      {/* Lista dei workout */}
      <div className="space-y-3 md:space-y-6">
        {/* Layout per dispositivi mobile */}
        <div className="md:hidden flex flex-col gap-3">
          {program?.workouts.map((workout) => (
            <div key={`mobile-${workout.id}`} className="bg-gray-50 rounded-lg shadow overflow-hidden">
              {/* Header del workout */}
              <div className="bg-red-600 text-white p-2 flex justify-between items-center">
                <div className="flex items-center">
                  <h3 className="text-sm font-medium">{workout.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Pulsanti per modificare, aggiungere esercizi ed eliminare */}
                  <button onClick={() => {
                      const newName = prompt('Modifica nome del giorno', workout.name);
                      if (newName && newName !== workout.name) {
                        handleEditWorkout(workout.id, newName);
                      }
                    }}>
                    <FaEdit className="w-3 h-3" />
                  </button>
                  <button onClick={() => {
                      setSelectedWorkout(workout);
                      setExerciseModalOpen(true);
                    }}>
                    <FaPlus className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleDeleteWorkout(workout.id)}>
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              {/* Lista degli esercizi */}
              <div className="p-1">
                {workoutExercises[workout.id]?.length === 0 ? (
                  <p className="text-gray-500 text-xs text-center py-1">Nessun esercizio</p>
                ) : (
                  <div className="grid grid-cols-1 gap-1 overflow-hidden">
                    {workoutExercises[workout.id]?.map((exercise) => (
                      <div key={exercise.id} className="bg-white rounded shadow p-1">
                        <div className="flex justify-between items-start gap-1">
                          <div className="flex items-start space-x-1">
                            <FaDumbbell className="text-red-600 mt-1 flex-shrink-0 w-3 h-3" />
                            <div>
                              <div className="font-medium text-xs truncate">{exercise.exercise_name}</div>
                              <div className="text-[10px] text-gray-600">
                                Serie: {exercise.sets} | Rep: {exercise.reps}
                                {exercise.weight && ` | ${exercise.weight}kg`}
                                {exercise.rest_time && ` | ${exercise.rest_time}min`}
                              </div>
                              {exercise.notes && (
                                <div className="text-[10px] text-gray-500 truncate">
                                  {exercise.notes}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {/* Pulsanti modifica/elimina esercizio */}
                            <button onClick={() => {
                                setSelectedExercise(exercise);
                                setSelectedWorkout(workout);
                                setEditExerciseModalOpen(true);
                              }}>
                              <FaEdit className="w-2 h-2" />
                            </button>
                            <button onClick={() => handleDeleteExercise(workout.id, exercise.id)}>
                              <FaTrash className="w-2 h-2" />
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
        
        {/* Layout per desktop */}
        <div className="hidden md:block">
          {program?.workouts.map((workout) => (
            <div key={workout.id} className="mb-8 bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <div className="bg-red-600 text-white p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-medium">{workout.name}</h3>
                  <div className="flex space-x-2">
                    <button onClick={() => {
                        const newName = prompt('Modifica nome del giorno', workout.name);
                        if (newName && newName !== workout.name) {
                          handleEditWorkout(workout.id, newName);
                        }
                      }}>
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteWorkout(workout.id)}>
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button onClick={() => {
                    setSelectedWorkout(workout);
                    setExerciseModalOpen(true);
                  }} 
                  className="text-white bg-red-700 hover:bg-red-800 px-3 py-1 rounded flex items-center">
                  <FaPlus className="mr-2" /> Aggiungi Esercizio
                </button>
              </div>
              
              <div className="container mx-auto px-4 py-4 md:py-6">
                <div className="space-y-4">
                  {workoutExercises[workout.id]?.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Nessun esercizio in questo workout</p>
                  ) : (
                    workoutExercises[workout.id]?.map((exercise) => (
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
                            <button onClick={() => {
                                setSelectedExercise(exercise);
                                setSelectedWorkout(workout);
                                setEditExerciseModalOpen(true);
                              }}>
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteExercise(workout.id, exercise.id)}>
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pulsante per aggiungere un nuovo workout */}
      <button onClick={() => setWorkoutModalOpen(true)}
        className="mt-4 md:mt-6 w-full py-2 md:py-3 border-2 border-dashed border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center text-sm md:text-base">
        <FaPlus className="mr-1 md:mr-2" /> Aggiungi giorno
      </button>

      {/* Modali per aggiunta/modifica */}
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