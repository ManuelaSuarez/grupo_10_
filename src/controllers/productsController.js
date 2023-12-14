const {json} = require("express");
const fs = require("fs");
const {get} = require("http");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const db = require("../database/models");

function getProducts() {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"))
    return products
}

const controller = {
    index: (req, res) => {
        db.Product.findAll() 
            .then((products) => {
                res.render("products", { products : products });
            });
        //res.render("products", { products: getProducts() })
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then((products) => {
                res.render("products/productDetail", { products:products })
            })
        /*const products = getProducts()
        const product = products.find( (product) => product.id == req.params.id)
        res.render("products/productDetail", { product })*/
    },
    create: (req, res) => {
        res.render("products/productCreate");
    },
    store: (req, res) => {
        db.Product.create({
            productName: req.body.nombreProducto,
            description: req.body.descripcionProducto,
            productImage: req.body.imagenProducto,
            category_id: req.body.categoria,
            size_id: req.body.talles,
            price: req.body.precioProducto
        });
        
        res.redirect("/products");

        /*const products = getProducts()
        const productToCreate = {
          id: products[products.length - 1].id + 1,
          imagenProducto: req.body.imagenProducto || "default-image.png",
          ...req.body,
        };
        products.push(productToCreate);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect("/products");*/
    },
    edit: (req, res) => {
        //res.render("products/productEdit")
        const products = getProducts()
        const product = products.find((product) => product.id == req.params.id);
        res.render("products/productEdit", { productToEdit: product});
    },
    update(req, res){
        /*db.Product.update({
            productName: req.body.nombreProducto,
            description: req.body.descripcionProducto,
            productImage: req.body.imagenProducto,
            category_id: req.body.categoria,
            size_id: req.body.talles,
            price: req.body.precioProducto
        }, {
            where: {id: req.params.id}
        });
        
        res.redirect("/products");
        */
        const products = getProducts()
        const indexProduct = products.findIndex(
            (product) => product.id == req.params.id
        )
        products[indexProduct] = {
            ...products[indexProduct],
            ...req.body
        }
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
        res.redirect("/products")
    },
    destroy: (req, res) => {
        /*db.Product.destroy({
            where: {id: req.params.id}
        })
        res.redirect("/products")
        */
        const products = getProducts();
        const indexProduct = products.findIndex((product) => product.id == req.params.id)
        products.splice(indexProduct, 1)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
        res.redirect("/products");
    },
    cart(req,res){
        res.render('products/productCart')
    }
}

module.exports = controller