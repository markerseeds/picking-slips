const express = require('express');
const pickingSlipController = require('../controllers/pickingSlipController');

const router = express.Router();

router.route('/').get(pickingSlipController.getAllPickingSlips);

module.exports = router;
