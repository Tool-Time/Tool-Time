
'use strict';

//===========Application dependencies=======
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3002;
const data = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

const mongodbURI = process.env.MONGODB_URI;
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('Mongoose is connected')});

//Routes//
app.get('/', data.getAllUsers);
app.get('/users', data.getTools);
app.get('/user/:id', data.getOneUser);
app.put('/borrow/:id', data.borrowTool);
// app.put();
app.post('/users/:id', data.addTool);
app.delete('/users/:id', data.deleteTool);



app.listen(PORT, () => {console.log(`Getting jiggy with it at ${PORT}.`);})