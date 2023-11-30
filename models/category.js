// models/category.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: "CategoryId",
      });
    }
  }
  Category.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Type must be unique.",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Type cannot be empty.",
          },
        },
      },
      sold_product_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: {
            args: true,
            msg: "Sold product amount cannot be empty.",
          },
          isInt: {
            args: true,
            msg: "Sold product amount must be an integer.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
      hooks: {
        afterCreate: async (category) => {
          // Lakukan penambahan sold product di sini jika diperlukan
        },
      },
    }
  );
  return Category;
};
