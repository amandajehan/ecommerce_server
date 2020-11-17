'use strict';
const { hashPassword } = require('../helpers/bcrypt.js')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: 'userId' })
      User.hasMany(models.Banner, { foreignKey: 'userId' })
      User.belongsToMany(models.Product, { through: models.Cart, foreignKey: 'userId' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'e-mail is required'
        },
        isEmail: {
          msg: 'invalid e-mail format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.role = 'customer'
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};