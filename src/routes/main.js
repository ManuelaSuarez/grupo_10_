const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.index)
router.get('/productDetail', mainController.productDetail)
router.get('/productCart', mainController.productCart)
router.get('/login-register', mainController.loginRegister)

module.exports = router;