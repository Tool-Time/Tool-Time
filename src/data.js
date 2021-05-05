'use strict';
const User = require('../models/user-model');

const data = {};

data.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

data.getTools = async (req, res) => {
  const category = req.query.category;

  try {
    const users = await User.find();
    const filteredUsers = users.filter(
      user => user.tools.reduce((acc, cur) => cur.category === category ? acc = true : acc ,false)
    );
    console.log(users[0].tools);
    res.status(200).json(filteredUsers);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}


data.addTool = async (req, res) => {
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
    res.status(400).json({message: err.message});
  }
}

data.deleteTool = async (req, res) => {
  const _id = req.params.id;
  console.log({_id});
  try{
    
    await Promise.all([(User.find({_id})),(User.deleteOne({_id}))]);
   

    res.status(200).json('Did it');
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}


module.exports = data;
