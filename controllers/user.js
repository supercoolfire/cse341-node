const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users]
  const result = await mongodb.getDatabase().db().collection('user').find();
  result.toArray().then((user) => {
    res.setHeader('content-type', 'application/json');
    res.status(200).json(user);
  });
}

const getSingle = async (req, res) => {
  //#swagger.tags=['Users]
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('user').findOne({ _id: userId });
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
    professionalName: req.body.professionalName,
    nameLink: {
      firstName: req.body.nameLink.firstName,
      url: req.body.nameLink.url,
    },
    base64Image: req.body.base64Image,
    firstName: req.body.firstName,
    primaryDescription: req.body.primaryDescription,
    workDescription1: req.body.workDescription1,
    workDescription2: req.body.workDescription2,
    linkTitleText: req.body.linkTitleText,
    linkedInLink: {
      link: req.body.linkedInLink.link,
      text: req.body.linkedInLink.text,
    },
    githubLink: {
      link: req.body.githubLink.link,
      text: req.body.githubLink.text,
    },
    contactText: req.body.contactText
  };

  const response = await mongodb.getDatabase().db().collection('user').insertOne(user);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while inserting the user.');
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    professionalName: req.body.professionalName,
    nameLink: {
      firstName: req.body.nameLink.firstName,
      url: req.body.nameLink.url,
    },
    base64Image: req.body.base64Image,
    firstName: req.body.firstName,
    primaryDescription: req.body.primaryDescription,
    workDescription1: req.body.workDescription1,
    workDescription2: req.body.workDescription2,
    linkTitleText: req.body.linkTitleText,
    linkedInLink: {
      link: req.body.linkedInLink.link,
      text: req.body.linkedInLink.text,
    },
    githubLink: {
      link: req.body.githubLink.link,
      text: req.body.githubLink.text,
    },
    contactText: req.body.contactText
  };

  const response = await mongodb.getDatabase().db().collection('user').replaceOne({ _id: userId }, user);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('user').deleteOne({ _id: userId });

  if (response.deletedCount > 0) {
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
};
