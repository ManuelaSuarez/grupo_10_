const { json } = require("express");
const fs = require("fs");
const { get } = require("http");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");
const db = require("../database/models");
const { validationResult } = require("express-validator");

function getProducts() {
  const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  return products;
}

const controller = {
  index: (req, res) => {
    db.Product.findAll().then((products) => {
      res.render("products", { products: products });
    });
    //res.render("products", { products: getProducts() })
  },
  detail: (req, res) => {
    db.Product.findByPk(req.params.id).then((product) => {
      res.render("products/productDetail", { product });
    });
    /*const products = getProducts()
        const product = products.find( (product) => product.id == req.params.id)
        res.render("products/productDetail", { product })*/
  },
  create: async (req, res) => {
    const categories = await db.ProductCategory.findAll();
    const sizes = await db.Size.findAll();
    res.render("products/productCreate", { categories, sizes });
  },

  store: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      const categories = await db.ProductCategory.findAll();
      const sizes = await db.Size.findAll();

      if (resultValidation.errors.length > 0) {
        return res.render("products/productCreate",{
          errors: resultValidation.mapped(),
          oldData: req.body,
          categories: categories,
          sizes: sizes
        });
      }
      db.Product.create({
        name: req.body.nombreProducto,
        description: req.body.descripcionProducto,
        image: req.file?.filename || "default-image.png",
        product_categories_id: req.body.categoria,
        sizes_id: req.body.talles,
        price: req.body.precioProducto,
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
    } catch (error) {
      console.error(error);
    }
  },

  edit: async (req, res) => {
    const categories = await db.ProductCategory.findAll();
    const sizes = await db.Size.findAll();
    db.Product.findByPk(req.params.id).then((product) => {
      res.render("products/productEdit", {
        product: product,
        categories,
        sizes,
      });
    });

    /*const products = getProducts()
        const product = products.find((product) => product.id == req.params.id);
        res.render("products/productEdit", { productToEdit: product});*/
  },
  update(req, res) {
    db.Product.update(
      {
        name: req.body.nombreProducto,
        description: req.body.descripcionProducto,
        product_categories_id: req.body.categoria,
        sizes_id: req.body.talles,
        price: req.body.precioProducto,
      },
      {
        where: { id: req.params.id },
      }
    );

    /*const products = getProducts()
        const indexProduct = products.findIndex(
            (product) => product.id == req.params.id
        )
        products[indexProduct] = {
            ...products[indexProduct],
            ...req.body
        }
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))*/
    res.redirect("/products");
  },
  destroy: (req, res) => {
    db.Product.destroy({
      where: { id: req.params.id },
    });
    res.redirect("/products");

    /*const products = getProducts();
        const indexProduct = products.findIndex((product) => product.id == req.params.id)
        products.splice(indexProduct, 1)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))*/
  },
  cart(req, res) {
    res.render("products/productCart");
  },
};

module.exports = controller;
