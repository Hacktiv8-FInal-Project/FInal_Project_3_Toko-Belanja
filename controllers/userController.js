const { User } = require("../models");

const { generateToken } = require("../utils/jwt");

const { comparePassword } = require("../utils/bcrypt");

class UserController {
  static async register(req, res) {
    try {
      const {
        full_name,
        password,
        gender,
        email
      } = req.body;
      
      const user = await User.create({
        full_name,
        email,
        password,
        gender,
        role: 'customer',
        balance: 0
      });

      res.status(201).json({
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          gender: user.gender,
          balance: `Rp.${user.balance}`,
          createdAt: user.createdAt,
        },
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(404).json({
          message: "Email not found",
        });
      }

      const checkPassword = comparePassword(password, user.password);

      if (!checkPassword) {
        res.status(404).json({
          message: "Wrong password",
        });
      } 
 
      const token = generateToken({
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        balance: `Rp.${user.balance}`
      });

      res.status(200).json({
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const {
        full_name,
        email
      } = req.body;

      const [count, [updatedUser]] = await User.update(
        {
          email,
          full_name
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );

      if (count === 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(200).json({
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            full_name: updatedUser.full_name,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;

      const deletedUser = await User.destroy({
        where: {
          id: id,
        },
      });

      if (deletedUser === 0) {
        res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "Your account has been successfully deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
 
  static async updateTopUp(req, res) {
    try {
      const { id } = req.params;
      let {
        balance
      } = req.body;

      let currentBalance = parseInt(balance);
    
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      const newBalance = user.balance + currentBalance;
      
      const [count, [updatedUser]] = await User.update(
        {
          balance: newBalance,
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );

      if (count === 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(200).json({
          message: `Your balance has been successfully updated to Rp.${currentBalance}`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = UserController;
