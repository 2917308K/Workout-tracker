const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());

const workoutSchema = new mongoose.Schema({
    exercise: String,
    sets: Number,
    reps: Number,
    weight: Number,
    date: {type : Date, default: Date.now},
});
const Workout = mongoose.model('Workout', workoutSchema);

app.get('/workouts', async (req, res) => {
  const workouts = await Workout.find().sort({ date: -1 });
  res.json(workouts);
});

app.post('/workouts', async (req, res) => {
  const { exercise, sets, reps, weight } = req.body;
  const newWorkout = new Workout({ exercise, sets, reps, weight });
  await newWorkout.save();
  res.json(newWorkout);
});

app.put('/workouts/:id', async (req, res) => {
  const { exercise, sets, reps, weight } = req.body;
  const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, { exercise, sets, reps, weight }, { new: true });
  res.json(updatedWorkout);
});

app.delete('/workouts/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.json({ message: 'Workout deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));