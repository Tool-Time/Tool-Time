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
  const {toolID} = req.body;
  console.log({_id},{toolID});
  try{
    const user = await User.findById({_id});
    user.tools.splice(toolID, 1);
    user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

data.modifyTool = async (req, res) => {
  const _id = req.params.id;
  const {toolID, borrowedBy, Availbility} = req.body;
  try{
    const user = await User.findById({_id});
    if(!user) console.log('no user found');

    const currentTool = user.tools.slice(toolID, toolID+1);
    currentTool[0].borrowedBy = borrowedBy;
    currentTool[0].Availbility = Availbility;

    user.tools[toolID] = currentTool[0];
    user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports = data;
