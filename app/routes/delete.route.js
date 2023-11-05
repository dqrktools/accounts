const express = require('express');
var router = express.Router();

const controller = require('../controllers/delete.controller');

router.post('/delete', controller.post);

module.exports = router;