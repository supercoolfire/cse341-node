const contactModel = require('../models/contacts');

const getAll = async (req, res) => {
  try {
    const contacts = await contactModel.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getSingle = async (req, res) => {
  try {
    const contact = await contactModel.getContactById(req.params.id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const createContact = async (req, res) => {
  try {
    const response = await contactModel.createContact(req.body);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateContact = async (req, res) => {
  try {
    const response = await contactModel.updateContact(req.params.id, req.body);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const response = await contactModel.deleteContact(req.params.id);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
