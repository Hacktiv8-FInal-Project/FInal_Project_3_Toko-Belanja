const router = require("express").Router();
const ProductController = require("../controllers/productController");
const { authentication } = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/", authentication, ProductController.createProduct);
router.get("/", authentication, ProductController.getProducts);
router.put("/:id", authentication, ProductController.updateProduct);
router.patch("/:id", authentication, ProductController.updateProductCategory);
router.delete("/:id", authentication, ProductController.deleteProduct);

module.exports = router;
