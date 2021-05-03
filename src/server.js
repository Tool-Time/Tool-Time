
'use strict';

//===========Application dependencies=======
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user-model');
const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/tools', {useNewUrlParser: true, useUnifiedTopology: true});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('Mongoose is connected')});


// app.get('*', (req, res) => {
//   res.send()
// })

//sends back all users in collection
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
})

app.post('/users/:id', async (req, res) => {
  const _id = req.params.id;
  const {tools} = req.body;

  try{
    await User.find({_id}, (err, users) => {
      if(!users.length) console.log('no user found');

      const user = users[0];
      user.tools.push(tools[0]);
      user.save();

      res.status(200).json(user);
  })
  } catch (err) {
    res.status(400).json({message: err.message})
  }
})

app.listen(PORT, () => {console.log(`Getting jiggy with it at ${PORT}.`);})