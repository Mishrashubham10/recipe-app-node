const express = require('express');
require('dotenv').config();
const dbConnection = require('./config/db');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const path = require('path')

// DB
dbConnection();

const app = express();
const PORT = process.env.PORT || 4500;

// view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'))
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB`);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});