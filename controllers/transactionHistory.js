const {User, Category ,TransactionHistory} = require('../models')

class TransactionHistoryController {
    static async create(req, res, next) {
        try {
            const {quantity, total_price, UserId} = req.body;
            const transactionHistory = await TransactionHistory.create({
                quantity,
                total_price,
                UserId
            });
            res.status(201).json({
                id: transactionHistory.id,
                quantity: transactionHistory.quantity,
                total_price: transactionHistory.total_price,
                UserId: transactionHistory.UserId
            });
        } catch (err) {
            next(err);
        }
    }

    static async read(req, res, next) {
        try {
            const transactionHistories = await TransactionHistory.findAll({
                include: [User, Category]
            });
            res.status(200).json(transactionHistories);
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const {quantity, total_price, UserId} = req.body;
            const {id} = req.params;
            const transactionHistory = await TransactionHistory.update({
                quantity,
                total_price,
                UserId
            }, {
                where: {
                    id
                },
                returning: true
            });
            res.status(200).json(transactionHistory[1][0]);
        }
        catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const {id} = req.params;
            const transactionHistory = await TransactionHistory.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({
                message: "Transaction History deleted successfully"
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = TransactionHistoryController;