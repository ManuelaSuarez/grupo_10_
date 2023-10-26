const controller = {
    index(req, res){
        res.render('index')
    },
    productos(req, res){
        res.render('products/products')
    }
}

module.exports = controller;