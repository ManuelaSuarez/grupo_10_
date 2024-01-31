const validator = require("validator");
const db = require("../../database/models");

const controlador = {
  validateProduct: async (req, res, next) => {
    const categories = await db.ProductCategory.findAll();
    const sizes = await db.Size.findAll();
    const {
      nombreProducto,
      descripcionProducto,
      categoria,
      talles,
      precioProducto,
    } = req.body;
    const image = req.file;

    const errors = {};

    if (!validator.isLength(nombreProducto, { min: 5 })) {
      errors.nombreProducto = {
        msg: "El nombre debe tener al menos 5 caracteres",
      };
    }

    if (!validator.isLength(descripcionProducto, { min: 20 })) {
      errors.descripcionProducto = {
        msg: "La descripción debe tener al menos 20 caracteres",
      };
    }

    if (
      !image ||
      !["image/jpeg", "image/png", "image/gif"].includes(image.mimetype)
    ) {
      errors.imagenProducto = {
        msg: "La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF)",
      };
    }

    if (!categoria) {
      errors.categoria = { msg: "Seleccione una categoria válida" };
    }

    if (!talles) {
      errors.talles = { msg: "Seleccione un talle válido" };
    }

    if (
      !validator.isNumeric(precioProducto) ||
      parseFloat(precioProducto) <= 0
    ) {
      errors.precioProducto = {
        msg: "Ingrese un precio válido para el producto",
      };
    }

    if (Object.keys(errors).length > 0) {
      return res.render("products/productCreate", {
        errors,
        oldData: req.body,
        categories: categories,
        sizes: sizes,
      });
    }

    next();
  },
};

module.exports = controlador;
