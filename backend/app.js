const express = require('express');
const { connectDB } = require('./db/connectDB');
const { readdirSync } = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

readdirSync('./routes').map((route) =>
  app.use('/api/v1', require('./routes/' + route))
);

connectDB();

module.exports = app;
