'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};