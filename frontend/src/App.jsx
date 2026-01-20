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

  return (
    <>
      <div>
        <h1>Workout Tracker</h1>
        <ul>
          {workouts.map(workout => (
            <li key={workout._id}>
              {workout.exercise} - {workout.sets} sets, {workout.reps} reps, {workout.weight} kg
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
