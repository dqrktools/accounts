const Account = require('../models/account.model');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    create: async (accountToSave) => {
        new Account(accountToSave).save().then(() => {
            console.log('---> Save Account Successful <---\n');
        }).catch((err) => {
            console.log('------------------\n---> Save Account Error <---\n------------------\n' + err)
        });

        await sleep(750);
    },
    findByIdAndUpdateTotal: async (accountToUpdate) => {
        Account.findByIdAndUpdate(accountToUpdate._id.toString(),{
            $set: {
                total: accountToUpdate.total
            }
        }).then(() => {
            console.log('---> Update Account Successful <---\n');
        }).catch((err) => {
            console.log('------------------\n---> Update Account Error <---\n------------------\n' + err)
        });

        await sleep(750);

    },
    findByIdAndUpdateTotalAndCCR: async (accountToUpdate) => {
        Account.findByIdAndUpdate(accountToUpdate._id.toString(),{
            $set: {
                total: accountToUpdate.total,
                ccr: accountToUpdate.ccr
            }
        }).then(() => {
            console.log('---> Update Account Successful <---\n');
        }).catch((err) => {
            console.log('------------------\n---> Update Account Error <---\n------------------\n' + err)
        });

        await sleep(750);
    },
    deleteAll: async () => {
        Account.deleteMany().then(() => {
            console.log('---> Delete AllAccounts Successful <---\n');
        }).catch((err) => {
            console.log('------------------\n---> Delete AllAccounts Error <---\n------------------\n' + err)
        });

        await sleep(750);
    }
}