const controller = {
    index(req, res){
        res.render('index')
    },
    productDetail(req, res){
        res.render('products/productDetail')
    },
    productCart(req, res){
        res.render('products/productCart')
    },
    loginRegister(req, res){
        res.render('users/login-register')
    }
}

module.exports = controller;