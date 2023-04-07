const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Account = sequelize.define(
  'Account',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.hasOne(Account, { foreignKey: 'user_id' });
Account.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Account;
