const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');

const app = express();
mongoose.connect(process.env.MONGO_URI)
.then(db => {
  console.log('database connected');
  return db;
}).catch(err =>{
  console.log('connection error');
})

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static('upload/recipes'));
app.use('/profile-images', express.static('upload/users'));
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/recipes', recipesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
