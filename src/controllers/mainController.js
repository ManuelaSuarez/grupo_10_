const db = require("../database/models");


const controller = {
    index(req, res){
        db.Product.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        }).then((products) => {
            res.render('index', {products: products})
        })
    }
}

module.exports = controller;