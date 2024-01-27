const path = require('path');
const {body, check} = require('express-validator');

const productValidation = [
    body('nombreProducto').notEmpty().withMessage('Tienes que escribir un nombre')
      .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('descripcionProducto').isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    check('categoria').notEmpty().withMessage('Debes elegir una categoria'),
    check('talles').notEmpty().withMessage('Debes elegir un talle'),
    body('precioProducto').notEmpty().withMessage('Debe ingresar el precio de su producto'),
    body('imagenProducto').custom((value, { req }) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.gif'];
  
      if (!file) {
        throw new Error('Tienes que subir una imagen');
      } else {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
          throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
      }
      return true;
    }),
  ];
  

  module.exports = productValidation