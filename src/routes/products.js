const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.index)
router.get('/create', productsController.create)
router.get('/products/:id', productsController.productDetail)
router.post('/products', productsController.store)
router.get('/products/:id/edit', productsController.edit)
router.put('/products/:id', productsController.productDetail)
router.delete('/products/:id', productsController.destroy)



module.exports = router;