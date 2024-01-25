const User = require('../models/User');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    try {
        const emailInCookie = req.cookies.userEmail;
        
        if (emailInCookie) {
            const userFromCookie = await User.findByField('email', emailInCookie);
            
            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            }
        }

        if (req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }
    } catch (error) {
        // Manejar errores si es necesario
        console.error('Error en middleware de usuario conectado:', error);
    }

    next();
}

module.exports = userLoggedMiddleware;