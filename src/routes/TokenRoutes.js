const express = require('express');
const router = express.Router();

const TokenController = require('../controllers/TokenController');

router.use('/save', TokenController.saveToken);
router.use('/', TokenController.getAllToken);

module.exports = router;