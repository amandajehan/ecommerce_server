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
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
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