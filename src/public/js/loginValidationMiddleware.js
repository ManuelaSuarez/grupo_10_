const validator = require("validator");

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = {};

  if (!validator.isEmail(email)) {
    errors.email = { msg: "El correo electrónico no es válido" };
  }

  if (!password) {
    errors.password = { msg: "La contraseña es obligatoria" };
  }

  if (Object.keys(errors).length > 0) {
    return res.render("users/login", { errors, oldData: req.body });
  }
  next();
};

module.exports = {
  validateLogin,
};
