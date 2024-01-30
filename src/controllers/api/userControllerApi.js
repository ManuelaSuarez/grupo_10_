const db = require("../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll();

            return res.json({
                count: users.length,
                users: users
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    show: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);

            return res.json({
                user: user
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

};