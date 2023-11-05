const express = require('express');
var router = express.Router();

const controller = require('../controllers/update.controller');

router.post('/update', controller.post);

module.exports = router;