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
      // define association here
    }
  }
  Product.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    product_categories_id: {
      type: DataTypes.INTEGER
    },
    sizes_id: {
      type: DataTypes.INTEGER
    },
    price: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    image: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  // Product.associate = function(models){
  //   Product.belongsToMany(models.ProductCategory, {
  //     as: 'categorias',
  //     through: 'product_categories',
  //     foreignKey: 'product_categories_id',
  //     timestamps: false,
  //     onDelete: 'cascade'
  //   })
  // }
  return Product;
};