const db = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll();

            const formattedUsers = users.map(user => {
                return {
                    id: user.id,
                    name: user.first_name,
                    email: user.email,
                    detail: `/api/users/${user.id}`
                };
            });

            return res.json({
                count: formattedUsers.length,
                users: formattedUsers
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