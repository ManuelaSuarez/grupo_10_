const express = require('express');
const router = express.Router();

const productControllerApi = require('../../controllers/api/productControllerApi');

router.get('/search', productControllerApi.search);
router.get("/", productControllerApi.list)
router.get("/:id", productControllerApi.show)


module.exports = router;