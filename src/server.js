
'use strict';

//===========Application dependencies=======
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;

const app = express();

mongoose.connect('mongodb://localhost/tools', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('Mongoose is connected')});

const toolSchema = new mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  owner: {type: String, required: true},
  borrowedBy: {type: String},
  Availbility: {type: Boolean, required: true},
})

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String},
  location: {type: Array, required: true},
  rating: {type: Number},
  tools: [toolSchema]
})

const UserModel = new mongoose.model('User', userSchema);

const rinat = new UserModel({
  name: 'Rinat Galeev',
  email: 'rinat@galeev.com',
  location: [100, 100],
  rating: 4,
  tools: [{
    name: 'smoothing plane',
    category: 'carpentry',
    owner: 'Rinat Galeev',
    borrowedBy: '',
    Availbility: true
  }]
})

const dion = new UserModel({
  name: 'Dion Johnson',
  email: 'dion@johnson.com',
  location: [80, 80],
  rating: 4,
  tools: [{
    name: 'wood saw',
    category: 'carpentry',
    owner: 'Dion Johnson',
    borrowedBy: '',
    Availbility: true
  }]
})

const michael = new UserModel({
  name: 'Michael Campbell',
  email: 'michael@campbell.com',
  location: [90, 90],
  rating: 4,
  tools: [{
    name: 'level',
    category: 'carpentry',
    owner: 'Michael Campbell',
    borrowedBy: '',
    Availbility: true
  }]
})

const cullen = new UserModel({
  name: 'Cullen Sharp',
  email: 'cullen@sharp.com',
  location: [70, 70],
  rating: 4,
  tools: [{
    name: 'vinyl knife',
    category: 'flooring',
    owner: 'Cullen Sharp',
    borrowedBy: '',
    Availbility: true
  }]
})

cullen.save();
michael.save();
dion.save();
rinat.save();

app.get('/ping', (request, response) => {
  try{
    response.status(200).send('pong');
  } catch (error) {
    response.send(500).send(error);
  }
})

app.listen(PORT, () => {console.log(`Getting jiggy with it at ${PORT}.`);})