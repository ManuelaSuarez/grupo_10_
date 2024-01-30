const db = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
          const products = await db.Product.findAll();
      
          const count = products.length;
      
          const countByCategory = {};
        //   products.forEach(product => {
        //     product.product_categories.forEach(category => {
        //       countByCategory[category] = (countByCategory[category] || 0) + 1;
        //     });
        //   });
      

          const productsWithDetails = products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            categories: product.categories,
            detail: `http://127.0.0.1:3000/api/product/${product.id}`
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
            //   { model: db.ProductCategory, as: 'categorias' },
            //   { model: db.Size, as: 'sizes' },
            ],
          });
      
          if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
          }
      

          const productImageUrl = `https://127.0.0.1:3000/api/product/${product.id}/image`;

          return res.json({
            id: product.id,
            name: product.name,
            description: product.description,     
            // categories: product.categories.map(category => category.name),
            // sizes: product.sizes.map(size => size.name),

            imageUrl: productImageUrl
          });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }
};