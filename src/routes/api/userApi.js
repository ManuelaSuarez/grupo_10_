const express = require('express');
const router = express.Router();

const userControllerApi = require('../controllers/api/userControllerApi');

router.get("api/user", userControllerApi.list)
router.get("api/user/:id", userControllerApi.show)