const express = require('express');
const router = express.Router();

const userControllerApi = require('../controllers/api/userControllerApi');

router.get("/", userControllerApi.list)
router.get("/:id", userControllerApi.show)

module.exports = router;