const router = require("express").Router();
const ProductController = require("../controllers/productController");
const { authentication } = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", authentication, ProductController.getProducts);
router.post("/", authentication, authorization.admin, ProductController.createProduct);
router.put("/:id", authentication, authorization.admin, authorization.product, ProductController.updateProduct);
router.patch("/:id", authentication, authorization.admin, authorization.product, ProductController.updateProductCategory);
router.delete("/:id", authentication, authorization.admin, authorization.product, ProductController.deleteProduct);

module.exports = router;
