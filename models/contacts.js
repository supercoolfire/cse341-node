const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async () => {
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  return result.toArray();
}

const getContactById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('Must use a valid contact id.');
  }

  const contactId = new ObjectId(id);
  return mongodb.getDatabase().db().collection('contacts').findOne({ _id: contactId });
}

const createContact = async (contact) => {
  validateContactFields(contact);

  return mongodb.getDatabase().db().collection('contacts').insertOne(contact);
}

const updateContact = async (id, contact) => {
  validateContactFields(contact);

  if (!ObjectId.isValid(id)) {
    throw new Error('Must use a valid contact id.');
  }

  const contactId = new ObjectId(id);
  return mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, contact);
}

const deleteContact = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('Must use a valid contact id.');
  }

  const contactId = new ObjectId(id);
  return mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
}

const validateContactFields = (contact) => {
  if (!contact.firstName || !contact.lastName || !contact.email || !contact.favoriteColor || !contact.birthday || !contact.phoneNumber) {
    throw new Error('All fields (firstName, lastName, email, favoriteColor, birthday, phoneNumber) are required.');
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
