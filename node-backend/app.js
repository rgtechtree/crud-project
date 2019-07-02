// @ts-nocheck
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
app.use(cors());

// connect with Mongodb
const db =
  "mongodb+srv://rohitgupta:u9vPEX97yFhnm4Us@cluster0-viozg.mongodb.net/test?retryWrites=true";

mongoose.connect(db, { useNewUrlParser: true }, err => {
  if (err) {
    console.log("Error is", err);
  } else {
    console.log("Connected to Mongo DB");
  }
});
app.use(morgan('dev'));

const productsRoute = require('./api/routes/products');
const userRoutes = require('./api/routes/user');

// function verifyToken(req, res, next) {
//   if (!req.headers.authorization) {
//     return res.status(401).json({
//       message: 'Unauthorized Token'
//     });
//   }
//   let token = req.headers.authorization;
//   if(token === null){
//     return res.status(401).json({
//       message: 'Unauthorized Token'
//     });
//   }
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, PATCH, DELETE,'
    );
    return res.status(200).json({});
  }
  next();
});

app.use('/users', productsRoute);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 5000);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;