const mongoose = require('mongoose');
const { Schema } = mongoose;

const billSchema = new Schema({
	debtorId: {
		type: mongoose.ObjectId,
        required: true
	},
    date: {
		type: Date,
        required: true
	},
	dateInput: {
		type: String,
        required: true
	},
	dateShort: {
		type: String,
        required: true
	},
	dateFull: {
		type: String,
        required: true
	},
	value: {
		type: Number,
        required: true
	},
	balance: {
		type: String,
        required: true
	},
	info: {
		type: String,
        required: true
	}
});

module.exports = mongoose.model('bill', billSchema);