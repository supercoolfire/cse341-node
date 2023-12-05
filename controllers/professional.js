const mongodb = require('../data/database');

const getData = async (req, res, next) => {
  const result = await mongodb.getDatabase().db().collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // we just need the first one (the only one)
  });
};

module.exports = { getData };
