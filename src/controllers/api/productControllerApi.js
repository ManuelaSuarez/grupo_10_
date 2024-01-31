const db = require("../../database/models");
const Op = db.Sequelize.Op;

module.exports = {
  list: async (req, res) => {
    try {
      const categories = await db.ProductCategory.findAll();
      const count = await db.Product.count();
      const countCategorias = await db.ProductCategory.count();

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
        attributes: ["id", "name", "description", 'price', 'image'],
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
        detail: `/api/products/${product.id}`,
        image: product.image
      }));

      return res.json({
        count: count,
        countByCategory: countByCategory,
        products: productsWithDetails,
        countCategorias: countCategorias
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

      const image = product.image;

      return res.json({ 
        product, 
        image: `http://localhost:3000/images/products/${image}`
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  search: (req, res) => {
    db.Product
        .findAll({
            where: {
                name: {[Op.like]: '%' + req.query.keyword + '%'}
            }
        })
        .then(products => {
            return res.status(200).json(products);
        })
}
};
