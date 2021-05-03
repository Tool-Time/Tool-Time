
'use strict';

//===========Application dependencies=======
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;

const app = express();

app.get('/ping', (request, response) => {
  try{
    response.status(200).send('pong');
  } catch (error) {
    response.send(500).send(error);
  }
})

app.listen(PORT, () => {console.log(`Getting jiggy with it at ${PORT}.`);})