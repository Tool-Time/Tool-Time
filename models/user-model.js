'use strict';

const mongoose = require('mongoose');

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

exports.exports = mongoose.model('User', userSchema);
