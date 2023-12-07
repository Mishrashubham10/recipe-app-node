const express = require('express');
require('dotenv').config();
const dbConnection = require('./config/db');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

// DB
dbConnection();

const app = express();
const PORT = process.env.PORT || 4500;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// routes
app.use('/api/auth', authRoutes);
app.use('/', (req, res) => res.render('home'));
app.use('/smoothies', (req, res) => res.render('smoothies'));

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB`);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});