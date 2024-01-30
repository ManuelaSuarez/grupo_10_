const db = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll();
            const usuariosDetalle = users.map(user => ({
                id: user.id,
                name: user.first_name,
                email: user.email,
                detail: `http://127.0.0.1:3000/api/user/${user.id}`
            }))

            return res.json({
                count: users.length,
                users: usuariosDetalle
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    show: async (req, res) => {
        try {
          const user = await db.User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
          });
      
          if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
          }
      
          const profileImageUrl = `https://127.0.0.1:3000/api/user/${user.id}/avatar`;
      
          return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            profileImageUrl: profileImageUrl
          });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }

};