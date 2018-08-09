const CONFIG = require('./config');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(CONFIG.DB_URL, { useNewUrlParser: true }, (err, database) => {
  if (err) {
    console.error(`Error during database setup ${err}`);
    return;
  }
  const db = database.db('db');
  db.collection('links').createIndex({ shortID: 1 }, { unique: true }).then(() => {
    console.log('Setup is done');
  }).catch(e => {
    console.error(`Error during database setup: ${e}`)
  }).finally(() => {
    database.close();
  });
});
