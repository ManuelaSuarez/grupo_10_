const db = require("../../database/models");

module.exports = {
  list: async (req, res) => {
    try {
      const categories = await db.ProductCategory.findAll();
      const count = await db.Product.count();

      const countByCategory = {};
      for (const category of categories) {
        const categoryName = category.country;
        const categoryId = category.id;
        const categoryCount = await db.Product.count({
          where: { product_categories_id: categoryId },
        });
        countByCategory[categoryName] = categoryCount;
      }

      const products = await db.Product.findAll({
        attributes: ["id", "name", "description", 'price'],
        include: [
          {
            model: db.ProductCategory,
            as: "category",
            attributes: ["country"],
          }, {
            model: db.Size,
            as: 'size',
            attributes: ['size']
          }
        ]
      });

      const productsWithDetails = products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        categories: product.category,
        size: product.size,
        detail: `/api/product/${product.id}`,
      }));

      return res.json({
        count: count,
        countByCategory: countByCategory,
        products: productsWithDetails
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  show: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: ["category", "size"],
      });

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      const image = `../../public/images/products/${product.image}`;

      return res.json({ product, imagen: image });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
