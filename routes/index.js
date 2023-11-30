const router = require("express").Router();
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const transactionHistoryRouter = require("./transactionHistoryRouter")

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/transactions", transactionHistoryRouter)

module.exports = router;
