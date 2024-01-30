const express = require('express');
const router = express.Router();

const productControllerApi = require('../controllers/api/productControllerApi');

router.get("api/product", productControllerApi.list)
router.get("api/product/:id", productControllerApi.show)