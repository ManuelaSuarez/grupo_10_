const db = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
          const products = await db.Product.findAll();
      
          const count = products.length;
      
          const countByCategory = await db.Product.findAll();
      
          const productsWithDetails = products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            categories: product.categories,
            detail: `/api/product/${product.id}`
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
            include: [
              "category",
              "size"
            ],
          });
      
          if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
          }
      

          return res.json(product);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
};