const { User, Product, Category, TransactionHistory } = require("../models");
const { verifyToken } = require("../utils/jwt");
class Authorization {
  static async user(req, res, next) {
    try {
      const userId = req.userData.id;
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (userId !== user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async admin(req, res, next) {
    try {
      const userId = req.userData.id;
      const user = await User.findByPk(userId);
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
 
  static async product(req, res, next) {
    const id = req.params.id;
    Product.findOne({
      where: {
        id: id,
      },
    })
      .then((product) => {
        if (!product) {
          return res.status(404).json({
            message: "Product not found",
            devMessge: `Product with id ${id} not found`,
          });
        }

        //jika Category Product tidak ada saat dibuat
        if (!product.CategoryId) {
          return res.status(400).json({
            message: "Category Product not found",
            devMessge: `Category Product with id ${product.CategoryId} not found`,
          });
        }
        return next();
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Internal server error",
          devMessage: err.message,
        });
      });
  }

  static async category(req, res, next) {
    const id = req.params.id;
    Category.findOne({
      where: {
        id: id,
      },
    })
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            message: "Category not found",
            devMessge: `Category with id ${id} not found`,
          });
        }
        return next();
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Internal server error",
          devMessage: err.message,
        });
      });
  }

  static async transaction(req, res, next) {
    const id = req.params.id;
    TransactionHistory.findOne({
      where: {
        id: id,
      },
    })
      .then((transaction) => {
        if (!transaction) {
          return res.status(404).json({
            message: "Transaction not found",
            devMessge: `Transaction with id ${id} not found`,
          });
        }
        if (
          transaction.UserId !== req.userData.id && req.userData.role !== "admin"
        ) {
          return res.status(401).json({
            message: "User not authorized",
            devMessge: `User with id ${req.userData.id} not authorized to id ${id}`,
          });
        } else if (req.userData.role === "admin") {
          return next();
        }
        return next();
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Internal server error",
          devMessage: err.message,
        });
      });
  }

}

module.exports = Authorization;
