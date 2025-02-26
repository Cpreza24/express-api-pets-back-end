const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI);

const petRouter = require('./controllers/pets.js');

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors({ origin: 'http://localhost:5173/' }));
app.use(express.json());
app.use(logger('dev'));

app.use('/pets', petRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});
