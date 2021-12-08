/**
 * @description   : It is use to establish the connection between the database and server
 * @package       : express, dotenv
 * @file          : server.js
 * @author        : Niharika K V
*/
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the ChatApp.' });
});

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});

module.exports = app;