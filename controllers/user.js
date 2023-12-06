const userModel = require('../models/userModel');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.setHeader('content-type', 'application/json');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const user = await userModel.getSingleUser(userId);
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  const user = req.body;
  try {
    const response = await userModel.createUser(user);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while inserting the user.');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = req.body;
  try {
    const response = await userModel.updateUser(userId, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const response = await userModel.deleteUser(userId);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
