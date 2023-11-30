const { Product, Category } = require("../models");

class ProductController {
  // create
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

  // get
  async getProducts(req, res) {
    try {
      // Mendapatkan semua produk beserta kategori terkait
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
      });

      // Mengembalikan respons
      res.status(200).json({
        products: products.map((product) => ({
          id: product.id,
          title: product.title,
          price: formatRupiah(product.price),
          stock: product.stock,
          CategoryId: product.CategoryId,
          updatedAt: product.updatedAt,
          createdAt: product.createdAt,
        })),
      });
    } catch (error) {
      // Menangani kesalahan
      res.status(500).json({ error: error.message });
    }
  }

  // put
  async updateProduct(req, res) {
    try {
      // Mendapatkan productId dari params dan data produk dari body
      const { id } = req.params;
      const { title, price, stock } = req.body;

      // Mengambil produk yang akan diupdate
      const product = await Product.findByPk(id, {
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
      });

      // Jika produk tidak ditemukan
      if (!product) {
        return res.status(404).json({ error: "Product not found." });
      }

      // Melakukan update pada produk
      product.title = title;
      product.price = price;
      product.stock = stock;
      await product.save();

      // Mengembalikan respons
      res.status(200).json({
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
      // Menangani kesalahan
      res.status(400).json({ error: error.message });
    }
  }
  // patch

  async updateProductCategory(req, res) {
    try {
      const { id } = req.params;
      const { CategoryId } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found." });
      }

      const category = await Category.findByPk(CategoryId);

      if (!category) {
        return res.status(404).json({ error: "Category not found." });
      }
      product.CategoryId = CategoryId;
      await product.save();

      res.status(200).json({
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
      // Menangani kesalahan
      res.status(400).json({ error: error.message });
    }
  }

  // delete
  async deleteProduct(req, res) {
    try {
      // Mendapatkan productId dari params
      const { id } = req.params;

      // Menghapus produk berdasarkan ID
      const deletedProductCount = await Product.destroy({
        where: {
          id: id,
        },
      });

      // Jika tidak ada produk yang dihapus
      if (deletedProductCount === 0) {
        return res.status(404).json({ error: "Product not found." });
      }

      // Mengembalikan respons
      res.status(200).json({
        message: "Product has been successfully deleted.",
      });
    } catch (error) {
      // Menangani kesalahan
      res.status(400).json({ error: error.message });
    }
  }
}
// Fungsi untuk memformat harga ke format rupiah
function formatRupiah(amount) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

module.exports = new ProductController();
