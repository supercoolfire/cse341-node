const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async () => {
  const result = await mongodb.getDatabase().db().collection('user').find();
  return result.toArray();
};

const getSingleUser = async (userId) => {
  const result = await mongodb.getDatabase().db().collection('user').findOne({ _id: userId });
  return result;
};

const createUser = async (user) => {
  const response = await mongodb.getDatabase().db().collection('user').insertOne(user);
  return response;
};

const updateUser = async (userId, user) => {
  const response = await mongodb.getDatabase().db().collection('user').replaceOne({ _id: userId }, user);
  return response;
};

const deleteUser = async (userId) => {
  const response = await mongodb.getDatabase().db().collection('user').deleteOne({ _id: userId });
  return response;
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
