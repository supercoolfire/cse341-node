const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users]
  const result = await mongodb.getDatabase().db().collection('users').find();
  result.toArray().then((users) => {
    res.setHeader('content-type', 'application/json');
    res.status(200).json(users);
  });
}

const getSingle = async (req, res) => {
  //#swagger.tags=['Users]
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
  if (result) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}

// week2
const createUser = async (req, res) => {
  //#swagger.tags=['Users]
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.firstName,
    email: req.body.firstName,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('users').insertOne(user)
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while inserting the user.');
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.firstName,
    email: req.body.firstName,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user)
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
  if (response.deleted > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
// week2
  createUser,
  updateUser,
  deleteUser
}