const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = ((callback) => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }
  MongoClient.connect(process.env.MOGODB_URL)
    .then((clent) => {
      database = clent;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
});
const getDatabase = () => {
  if(!database) {
    throw Error('Database not initialized')
  }
  return database
}

module.exports = {
  initDb,
  getDatabase
}