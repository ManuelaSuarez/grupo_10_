const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

// router.get('/products', )
router.get('/products/create', productsController.create)
// router.get('/products/:id', )
// router.post('/products', )
// router.get('/products/:id/edit', )
// router.put('/products/:id', )
// router.delete('/products/:id', )/



module.exports = router;