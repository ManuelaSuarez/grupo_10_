const db = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll();
            const usuariosDetalle = users.map(user => ({
                id: user.id,
                name: user.first_name,
                email: user.email,
                detail: `/api/user/${user.id}`
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
      
          return res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            image: `../../public/images/users/${user.avatar}`
          });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }

};