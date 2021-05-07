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
    const filteredUsers = users.filter(user => {
      let temp = user.tools.filter(tool => tool.category === category);
      return temp.length > 0;
    });
    
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

data.borrowTool = async (req, res) => {
  const _id = req.params.id;
  const {
    borrowerID,
    toolID } = req.body;
  try{
    const owner = await User.findById({_id});
    if(!owner) console.log('no owner found');

    const borrower = await User.findById({_id: borrowerID});
    if(!borrower) console.log('no borrower found');

    const currentTool = owner.tools.slice(toolID, toolID+1);
    currentTool[0].borrowedBy = borrower.name;
    currentTool[0].Availbility = !currentTool[0].Availbility;

    owner.tools[toolID] = currentTool[0];
    owner.save();

    borrower.tools.push(currentTool[0]);
    borrower.save();

    res.status(200).json(borrower);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

data.getOneUser = async (req, res) => {
  const _id = req.params.id;
  try{
    const user = await User.findById({_id});
    if(!user) console.log('user not found');

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

data.modifyMyTools = async (req, res) => {
  const _id = req.params.id;
  const {toolID, name, category, borrowedBy, Availbility} = req.body;

  try{
    const user = await User.findById({_id});
    if(!user) console.log('user not found');

    const newTool = {
      name,
      category,
      owner: user.name,
      borrowedBy,
      Availbility
    }

    user.tools.splice(toolID, 1, newTool);
    user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports = data;
