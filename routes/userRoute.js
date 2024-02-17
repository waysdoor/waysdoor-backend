const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
router.post('/api/add-user',userController.addUser )

module.exports = router
