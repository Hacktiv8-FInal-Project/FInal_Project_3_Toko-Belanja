const {Category} = require('../models');

class CategoryController {
    static async create(req, res, next) {
        try {
            const {type, sold_product_amount} = req.body;
            const category = await Category.create({
                type,
                sold_product_amount
            });
            res.status(201).json({
                id: category.id,
                type: category.type,
                sold_product_amount: category.sold_product_amount
            });
        } catch (err) {
            next(err);
        }
    }

    static async read(req, res, next) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const {type, sold_product_amount} = req.body;
            const {id} = req.params;
            const category = await Category.update({
                type,
                sold_product_amount
            }, {
                where: {
                    id
                },
                returning: true
            });
            res.status(200).json(category[1][0]);
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const {id} = req.params;
            const category = await Category.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({
                message: "Category deleted successfully"
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CategoryController;