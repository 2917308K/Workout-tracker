import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { use } from 'react';

function App() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);
  
  const fetchWorkouts = async () => {
    const res = await axios.get('http://localhost:5000/workouts');
    setWorkouts(res.data);
  };

  const [form, setForm] = useState({ exercise: '', sets: '', reps: '', weight: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/workouts/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/workouts', form);
    }
    setForm({ exercise: '', sets: '', reps: '', weight: '' });
    fetchWorkouts();
  };

  const [editingId, setEditingId] = useState(null);

  const editWorkout = (workout) => {
    setForm(workout);
    setEditingId(workout._id);
  };

  const deleteWorkout = async (id) => {
    await axios.delete(`http://localhost:5000/workouts/${id}`);
    fetchWorkouts();
  };
  

  return (
    <>
      <div>
        <h1>Workout Tracker</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Exercise" value={form.exercise} onChange={(e) => setForm({ ...form, exercise: e.target.value })} required />
          <input type="number" placeholder="Sets" value={form.sets} onChange={(e) => setForm({ ...form, sets: e.target.value })} required />
          <input type="number" placeholder="Reps" value={form.reps} onChange={(e) => setForm({ ...form, reps: e.target.value })} required />
          <input type="number" placeholder="Weight (kg)" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} required />
          <button type="submit">Add Workout</button>
        </form>

        <ul>
          {workouts.map(workout => (
            <li key={workout._id}>
              <div>
                {workout.exercise} - {workout.sets} sets, {workout.reps} reps, {workout.weight} kg
              </div>
              <div>
                <button onClick={() => editWorkout(workout)}>Edit</button>
                <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
              </div>
            </li>
          ))}

        </ul>
      </div>
    </>
  )

  
}

export default App
