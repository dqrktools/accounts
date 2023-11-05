const express = require('express');
var router = express.Router();

const controller = require('../controllers/create.controller');

router.post('/create', controller.post);

module.exports = router;