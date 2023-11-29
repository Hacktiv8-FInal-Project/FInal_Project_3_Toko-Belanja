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
}

module.exports = Authorization;
