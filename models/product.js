// models/product.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "CategoryId",
        as: "category",
      });
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Title cannot be empty.",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Stock cannot be empty.",
          },
          isInt: {
            args: true,
            msg: "Stock must be an integer.",
          },
          min: {
            args: [5],
            msg: "Stock must be at least 5.",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price cannot be empty.",
          },
          isInt: {
            args: true,
            msg: "Price must be an integer.",
          },
          min: {
            args: [0],
            msg: "Price cannot be less than 0.",
          },
          max: {
            args: [50000000],
            msg: "Price cannot exceed 50,000,000.",
          },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        afterCreate: async (product) => {
          // Mendapatkan kategori terkait
          const category = await product.getCategory();

          // Menambahkan sold_product_amount pada kategori
          if (category) {
            category.sold_product_amount += 1;
            await category.save();
          }
        },
      },
    }
  );
  return Product;
};
