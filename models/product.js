'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name is required'
        },
        notNull: {
          msg: 'name cannot be null'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'image url is required'
        },
        isUrl: {
          msg: 'invalid image url format'
        },
        notNull: {
          msg: 'image url cannot be null'
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'price is required'
        },
        isNumeric: {
          msg: 'price must be in number'
        },
        notNull: {
          msg: 'price cannot be null'
        },
        isMinus(value) {
          if (value < 0) {
            throw new Error ('price must not less than or equal to zero, or minus')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'stock is required'
        },
        isInt: {
          msg: 'stock must be in integer'
        },
        notNull: {
          msg: 'stock cannot be null'
        },
        isMinus(value) {
          if (value < 0) {
            throw new Error ('stock must not less than or equal to zero, or minus')
          }
        }
      }
    },
    userId: DataTypes.INTEGER,
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'category is required'
        },
        notNull: {
          msg: 'category cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};