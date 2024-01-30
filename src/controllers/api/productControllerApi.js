const db = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll();

            return res.json({
                count: products.length,
                //countByCategory: ,
                products: products
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    show: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);

            return res.json({
                product: product
                //
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

};