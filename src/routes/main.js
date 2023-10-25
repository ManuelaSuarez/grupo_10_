const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.index)
router.get('/register', mainController.registerGet)
router.get('/login', mainController.loginGet)

module.exports = router;