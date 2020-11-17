'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {
      Banner.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Banner.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title banner is required'
        },
        notNull: {
          msg: 'title banner cannot be null'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'status banner is required'
        },
        notNull: {
          msg: 'status banner cannot be null'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'image url banner is required'
        },
        notNull: {
          msg: 'image url banner cannot be null'
        },
        isUrl: {
          msg: 'invalid image url format'
        }
      }
    },
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};