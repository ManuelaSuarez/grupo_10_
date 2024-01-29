const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersControllers');

const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const registerValidationMiddleware = require('../public/js/registerValidationMiddleware');
const loginValidationMiddleware = require('../public/js/loginValidationMiddleware');

router.get('/register', guestMiddleware ,usersController.register)

router.post('/register', uploadFile.single('avatar'), registerValidationMiddleware.validateRegistration, validations, usersController.processRegister)

router.get('/login', guestMiddleware, usersController.login)

router.post('/login', loginValidationMiddleware.validateLogin ,usersController.loginProcess)

router.get('/profile', authMiddleware, usersController.profile)

router.get('/logout/', usersController.logout)

module.exports = router;