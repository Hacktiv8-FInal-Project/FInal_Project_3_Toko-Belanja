const { Category, Product } = require("../models");

class CategoryController {
  // create
  async createCategory(req, res) {
    try {
      const { type } = req.body;
      const category = await Category.create({
        type,
      });

      res.status(201).json({
        category: {
          id: category.id,
          type: category.type,
          updatedAt: category.updatedAt,
          createdAt: category.createdAt,
          sold_product_amount: category.sold_product_amount,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //get categories
  async getCategory(req, res) {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Product,
            as: "Products",
            attributes: [
              "id",
              "title",
              "price",
              "stock",
              "CategoryId",
              "createdAt",
              "updatedAt",
            ],
          },
        ],
      });

      res.status(200).json({
        categories: categories.map((category) => ({
          id: category.id,
          type: category.type,
          sold_product_amount: category.sold_product_amount,
          updatedAt: category.updatedAt,
          createdAt: category.createdAt,
          Products: category.Products,
        })),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //update
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { type } = req.body;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: "Category not found." });
      }

      category.type = type;
      await category.save();

      res.status(200).json({
        category: {
          id: category.id,
          type: category.type,
          updatedAt: category.updatedAt,
          createdAt: category.createdAt,
          sold_product_amount: category.sold_product_amount,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //delete category
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const deletedCategoryCount = await Category.destroy({
        where: {
          id: id,
        },
      });

      if (deletedCategoryCount === 0) {
        return res.status(404).json({ error: "Category not found." });
      }

      res.status(200).json({
        message: "Category has been successfully deleted.",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CategoryController();
