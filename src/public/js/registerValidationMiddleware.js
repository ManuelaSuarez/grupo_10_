const validator = require('validator');

const validateRegistration = (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  const avatar = req.file;

  const errors = {};

  if (!validator.isLength(first_name, { min: 2 })) {
    errors.first_name = { msg: 'El nombre debe tener al menos 2 caracteres' };
  }

  if (!validator.isLength(last_name, { min: 2 })) {
    errors.last_name = { msg: 'El apellido debe tener al menos 2 caracteres' };
  }

  if (email == "") {
    errors.email = {msg: 'Tienes que escribir un correo electrónico'};
  } else{
    !validator.isEmail(email)
    errors.email = { msg: 'El correo electrónico no es válido' }
  }

  if (!validator.isLength(password, { min: 8 })) {
    errors.password = { msg: 'La contraseña debe tener al menos 8 caracteres' };
  }


  if (!avatar || !['image/jpeg', 'image/png', 'image/gif'].includes(avatar.mimetype)) {
    errors.avatar = { msg: 'La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF)' };
  }

  if (Object.keys(errors).length > 0) {
    return res.render('users/register', { errors, oldData: req.body });
  }

  next();
};

module.exports = {
  validateRegistration,
};