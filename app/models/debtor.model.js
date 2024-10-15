const mongoose = require('mongoose');
const { Schema } = mongoose;

const debtorSchema = new Schema({
	name: {
		type: String,
        required: true
	}
});

module.exports = mongoose.model('debtor', debtorSchema);