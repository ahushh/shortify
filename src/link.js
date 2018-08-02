const Hashids = require('hashids');
const MongoClient = require('mongodb').MongoClient;
const CONFIG = require('../config');
const hash = new Hashids(CONFIG.SALT);

class Link {
  constructor(url) {
    if (!url) {
      throw new Error(`Expected a not empty string, given `, url);
    }
    this.shortID = null;
    this.long = url;
  }
  generateShortID() {
    const number = this.long.split('').reduce((a, c, i) => c.charCodeAt(0) + a + i + 1, 0);
    this.shortID = hash.encode(number);
    return this;
  }
  _makeLink(req, id) {
    return `${CONFIG.PROTO || req.protocol}://${CONFIG.HOST || req.get('host')}/${id}`;
  }
  save(req) {
    return new Promise((resolve, reject) => {
      if (!this.shortID) {
        reject('ShortID is empty');
      }
      MongoClient.connect(CONFIG.DB_URL, { useNewUrlParser: true }, (err, database) => {
        const db = database.db('db');
        if (err) {
          reject(err);
          return;
        }
        const data = {
          shortID: this.shortID,
          URL: this.long,
        };
        db.collection('links').insert(data, (err, result) => {
          if (err && err.code !== 11000) {
            reject(err);
            return;
          }
          const link = this._makeLink(req, this.shortID);
          resolve(link);
        })
      });
    });
  }
  static get(shortID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(CONFIG.DB_URL, { useNewUrlParser: true }, function (err, database) {
        const db = database.db('db');
        if (err) {
          reject(err);
          return;
        }
        const result = db.collection('links').findOne({ shortID });
        resolve(result);
      });
    });
  }
}

module.exports = Link;
