require('dotenv').load();

module.exports = {
  DB_URL: `mongodb://${process.env.DB_HOST || 'db'}:27017`,
  SALT: process.env.SALT || 'qwertyui', 
  // if null, takes value from request header
  BASE_URL: process.env.BASE_URL || null, // e.g. http://bit.ly
};