
'use strict';

//===========Application dependencies=======
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;

const app = express();

mongoose.connect('mongodb://localhost/tools', {useNewUrlParser: true, useUnifiedTopology: true});

const User = require('../models/user-model');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('Mongoose is connected')});

// app.get

app.listen(PORT, () => {console.log(`Getting jiggy with it at ${PORT}.`);})