'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'userId' })
      Cart.belongsTo(models.Product, { foreignKey: 'productId' })
    }
  };
  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product ID is required'
        },
        notNull: {
          msg:'Product ID cannot be null'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'User ID is required'
        },
        notNull: {
          msg:'User ID cannot be null'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Quantity is required'
        },
        notNull: {
          msg:'Quantity cannot be null'
        },
        isMinus(value) {
          if (value < 0) {
            throw new Error ('quantity cannot be minus')
          }
        }
      }
    },
    status: DataTypes.BOOLEAN,

  }, {
    hooks: {
      beforeCreate(cart) {
        cart.status = false
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};