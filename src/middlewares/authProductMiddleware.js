function authMiddleware(req, res, next){
    if(!req.session.userLogged){
        return res.redirect('/error404')
    }
    next();
}

module.exports = authMiddleware;