const fs = require("fs");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { get } = require("http");
const path = require("path");
const db = require("../database/models");

const controller = {
  register(req, res) {
    res.render("users/register");
  },
  async processRegister(req, res) {
    try{
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userInDb = await db.User.findOne({ where: { email: req.body.email } });

    if (userInDb) {
      return res.render("users/register", {
        errors: {
          email: {
            msg: "Este email ya está registrado",
          },
        },
        oldData: req.body,
      });
    }

    let userToCreate = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.file.filename,
    };

    let userCreated = await db.User.create(userToCreate);

    return res.redirect("login");
  } catch(error){
    console.log(error)
  }
},
  login(req, res) {
    return res.render("users/login");
  },
  async loginProcess(req, res) {
    try{
    let userToLogin = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userToLogin) {
      let isOkThePassWord = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (isOkThePassWord) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.remember_user) {
          res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 60 });
        }

        return res.redirect("profile");
      }
      return res.render("users/login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("users/login", {
      errors: {
        email: {
          msg: "No se encuentra este email en nuestra base de datos",
        },
      },
    });
  } catch(error){
    console.log(error)
  }
},
  profile(req, res) {
    return res.render("users/profile", {
      user: req.session.userLogged,
    });
  },
  logout(req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = controller;