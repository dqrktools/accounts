const Debtor = require('../models/debtor.model');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    create: async (name) => {
        new Debtor({name}).save().then(() => {
            console.log('---> Save Debtor Successful <---\n');
        }).catch((err) => {
            console.log('------------------\n---> Save Debtor Error <---\n------------------\n' + err)
        });
    },
    read: () => {
        return Debtor.find().lean();
    }
}
