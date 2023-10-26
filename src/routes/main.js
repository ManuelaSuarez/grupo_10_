const express = require('express');

const mainController = require('../controllers/mainController');
// const usersController = require('../controllers/usersControllers');

const router = express.Router();

router.get('/', mainController.index)
// /router.get('/login-register', usersController.loginRegister)

module.exports = router;