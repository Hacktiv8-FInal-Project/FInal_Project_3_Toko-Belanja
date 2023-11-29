'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../utils/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Full name is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already exists",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required",
        },
        isEmail: {
          args: true,
          msg: "Invalid email format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required",
        },
        len:  {
          args: [6, 10],
          msg: "Password must be between 6 and 10 characters",
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Gender is required"
        },
        isIn: {
          args: [['male', 'female']],
          msg: "Gender must be either 'male' or 'female'"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Role is required"
        },
        isIn: {
          args: [['admin', 'customer']],
          msg: "Role must be either 'admin' or 'customer'"
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "Balance must be a number"
        },
        max: {
          args: 100000000,
          msg: "Balance cannot exceed 100000000"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = hashPassword(user.password);

        user.password = hashedPassword;
      },

      beforeValidate: (user) => {
        user.role = 'customer'
        if (user.balance < 0) {
          user.balance = 0
        }
      }
    },
  });
  return User;
};