const express = require('express');
var router = express.Router();

const controller = require('../controllers/bill.controller');

router.get('/bill/read/:billId', controller.read);
router.get('/bill/readByDebtor/:debtorId', controller.readByDebtor);
router.post('/bill/createOrUpdateBill', controller.createOrUpdate);
router.post('/bill/deleteBill', controller.deleteBill);
router.get('/bill/updateValues', controller.updateValues);


module.exports = router;