require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    connectTimeout: 30000,
    socketTimeout: 30000
  },
  retry: {
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /TIMEOUT/,
      /ESOCKETTIMEDOUT/,
      /ENOTFOUND/,
      /ENETUNREACH/,
      /EAI_AGAIN/
    ],
    max: 3
  }
});

module.exports = sequelize;
