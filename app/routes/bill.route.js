const express = require('express');
var router = express.Router();

const controller = require('../controllers/bill.controller');

router.post('/bill/create', controller.create);
router.get('/bill/read/:billId', controller.read);
router.post('/bill/update', controller.update);
router.post('/bill/delete', controller.delete);

router.get('/bill/readByDebtor/:debtorId', controller.readByDebtor);

router.post('/bill/createOrUpdateBill', controller.createOrUpdate);
router.post('/bill/deleteBill', controller.deleteBill);
router.get('/bill/updateValues', controller.updateValues);


module.exports = router;