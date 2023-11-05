const Bill = require('../models/bill.model');
const ObjectId = require('mongoose').Types.ObjectId
const fs = require('fs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    create: async (billToSave) => {
        new Bill(billToSave).save().then(() => {
            console.log('---> Save Bill Successful <---\n');
        }).catch((err) => {
            console.log('------------------\n---> Save Bill Error <---\n------------------\n' + err)
        });

        await sleep(750);
    },
    count: async () => {
        Bill.find().then((allBills) => {
            console.log('---> Count AllBills ' + allBills.length + ' <---\n');
        }).catch((err) => {
            console.log('------------------\n---> Count AllBills Error <---\n------------------\n' + err)
        });
    },
    read: async (_id) => {
        return Bill.findById(_id).lean().catch((err) => {
            console.log('------------------\n---> read Error <---\n------------------\n' + err)
        });
    },
    readByDebtor: async (debtorId) => {
        return Bill.find({debtorId: debtorId}).lean().catch((err) => {
            console.log('------------------\n---> readByDebtor Error <---\n------------------\n' + err)
        });
    },
    // findById: async (_id) => {
    //     Bill.findById({debtorId: debtorId}).then((allBillsDebtorId) => {
    //         let sumValue = 0
    //         for(oneBillDebtorId of allBillsDebtorId){
    //             sumValue += oneBillDebtorId.value;
    //         }
    //         console.log(sumValue);
    //     }).catch((err) => {
    //         console.log('------------------\n---> Count AllBills Error <---\n------------------\n' + err)
    //     });
    // },
    // correctBill: async (_id) => {
    //     Bill.find().then((allBills) => {
    //         const allMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    //         for(oneBill of allBills){

    //             oneBill.dateShort = (oneBill.date.getDate() <= 9 ? '0' + oneBill.date.getDate() : oneBill.date.getDate()) + '/' + (oneBill.date.getMonth() < 9 ? '0' + (oneBill.date.getMonth() + 1) : oneBill.date.getMonth() + 1) + '/' + oneBill.date.getFullYear().toString().substring(2); 
    //             oneBill.dateFull = (oneBill.date.getDate() <= 9 ? '0' + oneBill.date.getDate() : oneBill.date.getDate()) + '/' + allMonths[oneBill.date.getMonth()] + '/' + oneBill.date.getFullYear(); 

    //             oneBill.balance = oneBill.value < 0 ? 'red': 'green';

    //             Bill.findByIdAndUpdate(oneBill._id, oneBill).then(res => console.log('--')).catch(err => console.log(err))
    //         }
    //     }).catch((err) => {
    //         console.log('------------------\n---> Correct AllBills Error <---\n------------------\n' + err)
    //     });
    // },
    // deleteAll: async () => {
    //     Bill.deleteMany().then(() => {
    //         console.log('---> Delete AllBills Successful <---\n');
    //     }).catch((err) => {
    //         console.log('------------------\n---> Delete AllBills Error <---\n------------------\n' + err)
    //     });

    //     await sleep(750);
    // },
    // saveValues: async () => {
    //     Bill.find().then((allBills) => {
    //         fs.writeFileSync('./static/values.js', 'var allBills = ' + JSON.stringify(allBills));
    //         console.log('---> Bills saveValues Successful <---\n');
    //     }).catch((err) => {
    //         console.log('------------------\n---> Bills saveValues Error <---\n------------------\n' + err)
    //     });

    // },
}