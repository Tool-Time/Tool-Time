
'use strict';

//===========Application dependencies=======
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user-model');
const PORT = process.env.PORT || 3002;
const data = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/tools', {useNewUrlParser: true, useUnifiedTopology: true});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('Mongoose is connected')});

//Routes//
app.delete('/users/:id', data.deleteTool);
app.get('/users', data.getAllUsers);

app.post('/users/:id', data.addTool);

app.listen(PORT, () => {console.log(`Getting jiggy with it at ${PORT}.`);})