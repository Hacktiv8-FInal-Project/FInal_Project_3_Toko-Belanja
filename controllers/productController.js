const { Product } = require("../models");

class ProductController {
  async createProduct(req, res) {
    try {
      const { title, price, stock, CategoryId } = req.body;

      const product = await Product.create({
        title,
        price,
        stock,
        CategoryId,
      });

      res.status(201).json({
        product: {
          id: product.id,
          title: product.title,
          price: formatRupiah(product.price),
          stock: product.stock,
          CategoryId: product.CategoryId,
          updatedAt: product.updatedAt,
          createdAt: product.createdAt,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
// Fungsi untuk memformat harga ke format rupiah
function formatRupiah(amount) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

module.exports = new ProductController();
