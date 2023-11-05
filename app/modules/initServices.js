const manageDebtor = require('./manageDebtor');
const manageAccount = require('./manageAccount');
const manageBill = require('./manageBill');

const Bill = require('../models/bill.model');
const Debtor = require('../models/debtor.model');
const Account = require('../models/account.model');

const serviceSpotify = {
	nameId: 'spotify',
	nameShow: 'Spotify',
    dateStart: new Date(2022, 0, 4),
    dateEnd: new Date(2022, 11, 4),
	owner: 'Paulo',
	type: 'service',
	value: 5.82
}

const fixedTest = {
	serviceId: '_______id',
	billId: '_______id',
	dueDate: '__date',
    paidDate: '__date',
    isPaid: false,
	value: 0,
	obs: 'String',
	receipt: 'String',
}