const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const crateError = require('http-errors');
require('./socket-handler');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const accountRouter = require('./routes/account');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/account', accountRouter);

app.use((err, req, res, next) => {
  if (
    err.name === 'MongoError' ||
    err.name === 'ValidationError' ||
    err.name === 'CastError'
  ) {
    err.status = 422;
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || 'we have some error eccured.' });
});
app.use((err, req, res, next) => {
  if (req.get('accept').includes('json')) {
    return next(crateError(404));
  }

  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB Connected !');
  })
  .catch((err) => {
    console.log(`ERROR : ${err.message}`);
  });

module.exports = app;
