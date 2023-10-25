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
    registerGet(req, res){
        res.render('users/register')
    },
    loginGet(req, res){
        res.render('users/login')
    },
    productCreate(req, res){
        res.render('products/productCreate')
    },
    productEdit(req, res){
        res.render('products/productEdit')
    }
}

module.exports = controller;