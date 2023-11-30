const { User } = require("../models");
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
      // const token = req.headers.access_token
      const token = req.get("token");
      const Userdecoded = verifyToken(token);
      User.findOne({
        where: {
          id: Userdecoded.id,
          email: Userdecoded.email,
          role: "admin",
        },
      })
        .then((user) => {
          if (!user) {
            return res.status(401).json({
              message: "User not authenticated",
              devMessage: `User with id ${Userdecoded.id} not admin`,
            });
          }
          res.locals.user = user;
          return next();
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Internal server error",
            devMessage: err.message,
          });
        });
    } catch (err) {
      return res.status(401).json(err);
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
          transaction.UserId !== res.locals.user.id &&
          res.locals.user.role !== "admin"
        ) {
          return res.status(401).json({
            message: "User not authorized",
            devMessge: `User with id ${res.locals.user.id} not authorized to id ${id}`,
          });
        } else if (res.locals.user.role === "admin") {
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
