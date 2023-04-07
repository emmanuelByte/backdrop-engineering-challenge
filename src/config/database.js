const { Sequelize } = require('sequelize');
require('dotenv').config();
const isSSL = process.env.DATABASE_URL.includes('localhost') ? false : true;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: isSSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

module.exports = sequelize;
