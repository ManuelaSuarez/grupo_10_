const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

// router.get('/products', )
// router.get('/products/create', )
// router.get('/products/:id', )
// router.post('/products', )
// router.get('/products/:id/edit', )
// router.put('/products/:id', )
// router.delete('/products/:id', )/

router.get('/productDetail', productsController.productDetail)
router.get('/productCart', productsController)
router.get('/productCreate', productsControllerController.productCreate)
router.get('/productEdit', productsControllerController.productEdit)

module.exports = router;