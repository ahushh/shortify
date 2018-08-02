const CONFIG = require('../config');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(CONFIG.DB_URL, { useNewUrlParser: true }, (err, database) => {
  const db = database.db('db');
  if (err) {
    console.error(`Error during database setup ${err}`);
    return;
  }
  db.collection('links').createIndex({ shortID: 1 }, { unique: true }).then(() => {
    console.log('Setup is done');
  }).catch(e => {
    console.error(`Error during database setup: ${e}`)
  }).finally(() => {
    database.close();
  });
});
