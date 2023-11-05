const manageDebtor = require('./manageDebtor');
const manageAccount = require('./manageAccount');
const manageBill = require('./manageBill');

const Bill = require('../models/bill.model');
const Debtor = require('../models/debtor.model');
const Account = require('../models/account.model');

var mongoose = require('mongoose');

const fs = require('fs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    initDebtors: () => {
        const allDebtors = [
            {
                nameId: 'lucas',
                nameShow: 'Lucas',
                total: 0
            },
            {
                nameId: 'aline',
                nameShow: 'Aline',
                total: 0
            },
            {
                nameId: 'rute',
                nameShow: 'Rute',
                total: 0
            },
            {
                nameId: 'ygor',
                nameShow: 'Ygor',
                total: 0
            }
        ]
    
        for(let oneDebtor of allDebtors){
            manageDebtor.create(oneDebtor)
        }
    },
    initAccounts: async () => {
        const allAccounts = [
            {
                nameId: 'nubank',
                nameShow: 'Nubank',
                total: 0,
                ccr: 0,
                type: 'checking',
            },
            {
                nameId: 'caixa',
                nameShow: 'Caixa',
                total: 0,
                type: 'saving',
            },
            {
                nameId: 'bb',
                nameShow: 'BB',
                total: 0,
                type: 'saving',
            },
            {
                nameId: 'wallet',
                nameShow: 'Wallet',
                total: 0,
                type: 'saving',
            },
            {
                nameId: 'inter',
                nameShow: 'Inter',
                total: 0,
                ccr: 0,
                type: 'checking',
            },
            {
                nameId: 'picpay',
                nameShow: 'PicPay',
                total: 0,
                ccr: 0,
                type: 'checking',
            },
            {
                nameId: 'next',
                nameShow: 'Next',
                total: 0,
                ccr: 0,
                type: 'checking',
            },
            {
                nameId: 'will',
                nameShow: 'Will',
                total: 0,
                ccr: 0,
                type: 'checking',
            },

        ]

        await sleep(2000);
    
        for(let oneAccount of allAccounts){
            manageAccount.create(oneAccount)
            console.log('1s')
            await sleep(1000);
        }
    },
    initBills: async () => {
        const allBills = 


        [{accountId: '61e0c748a68e327e330c3ba3',date: '2021-01-01', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'xSaldo Acumulado', value: 14.85, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-01-07', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Nubank', value: 25.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-01-11', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Nubank', value: 20.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-01-12', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Nubank', value: -59.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-01-21', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Depósito Wallet', value: 2200.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-01-21', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Tranf. Nubank', value: -2200.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-02-19', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Auxílio UTF', value: 500.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-02-19', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -500.58, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-03-03', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Auxílio UTF', value: 500.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-03-03', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Depósito Dinheiro', value: 1250.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-03-04', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -1750.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-03-15', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Depósito Dinheiro', value: 320.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-03-15', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -320.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-05-06', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Aux. UTF', value: 1400.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-05-07', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Tranf. Nubank', value: -1400.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-05-17', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Dep. Wallet', value: 3000.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-05-18', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Tranf. Nubank', value: -2400.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-05-19', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -600.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-06-07', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Aux. UTF', value: 700.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-06-12', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -700.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-07-03', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. BB', value: 1600.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-07-07', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Aux. UTF', value: 700.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-07-08', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -2300.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-08-04', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Aux. UTF', value: 700.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-08-10', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -700.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-08-11', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: 180.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-08-11', debtorId: '61ddbb8eda0b6dd6a28d24bf',info: 'Detran', value: -86.50, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-08-11', debtorId: '61ddbb8eda0b6dd6a28d24bf',info: 'Detran', value: -86.50, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-09-02', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Aux. UTF', value: 700.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-09-04', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -707.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-09-06', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Dep. Wallet', value: 4200.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-09-09', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -2400.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-09-12', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -1800.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-09-21', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: 39.53, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-10-01', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Aux. UTF', value: 700.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-10-06', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -739.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-10-11', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: 100.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-10-11', debtorId: '61ddbb8eda0b6dd6a28d24bf',info: 'Detran', value: -86.50, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-11-08', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Aux. UTF', value: 700.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-11-08', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Bolsa', value: 400.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-11-14', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -1113.30, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-12-08', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Aux. UTF', value: 700.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-12-08', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Aux. UTF', value: 400.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-12-09', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -1100.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-12-16', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: 250.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2021-12-23', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Bolsa', value: 400.00, type: 'debit'},
        {accountId: '61e0c748a68e327e330c3ba3',date: '2022-01-04', debtorId: '61ddbb8eda0b6dd6a28d24be',info: 'Transf. Nubank', value: -650.00, type: 'debit'},
        ]
        
        


            await sleep(1000);
            
            for(let oneBill of allBills){
                console.log(oneBill.date + ' -- ' + oneBill.debtorId)
                manageBill.create(oneBill)
                await sleep(750);
        }
    },
    deleteAccounts: () => {
        manageAccount.deleteAll()
    },
    deleteBills: () => {
        manageBill.deleteAll()
    },
    setValuesAccount: () => {
        let valuesAccount = {
            '61e0c746a68e327e330c3b9f': 0.0,
            '61e0c747a68e327e330c3ba1': 0.0,
            '61e0c748a68e327e330c3ba3': 0.0,
            '61e0c749a68e327e330c3ba5': 0.0,
            '61e0c74aa68e327e330c3ba7': 0.0,
            '61e0c74ba68e327e330c3ba9': 0.0,
            '61e0c74ca68e327e330c3bab': 0.0,
            '61e0c74da68e327e330c3bad': 0.0,
        }

        let valueCCRNubank = 0.0

        Bill.find().then(async (allBills) => {

            for(let oneBill of allBills){
                if(oneBill.type =='debit'){
                    valuesAccount[oneBill.accountId.toString()] += oneBill.value
                }
                else{
                    valueCCRNubank += oneBill.value
                }
            }

            console.log(valuesAccount)
            console.log(valueCCRNubank)

            for(let oneValue in valuesAccount){
                Account.findByIdAndUpdate(oneValue,{$set: {total: valuesAccount[oneValue]}}).then(() => {console.log('Ok')})
                await sleep(1000)
            }
            
            Account.findByIdAndUpdate('61e0c746a68e327e330c3b9f',{$set: {ccr: valueCCRNubank}}).then(() => {console.log('Ok CCR')})
        
        }).catch((err) => {
            console.log(err)
        })
    },
    setValuesDebtor: () => {
        let valuesDebtor = {
            '61ddbb8eda0b6dd6a28d24bf': 0.0,
            '61ddbb8eda0b6dd6a28d24be': 0.0,
            '61ddbb8eda0b6dd6a28d24c1': 0.0,
            '61ddbb8eda0b6dd6a28d24c0': 0.0,
        }

        Bill.find().then(async (allBills) => {

            for(let oneBill of allBills){
                valuesDebtor[oneBill.debtorId.toString()] += oneBill.value
            }

            console.log(valuesDebtor)

            for(let oneValue in valuesDebtor){
                Debtor.findByIdAndUpdate(oneValue,{$set: {total: valuesDebtor[oneValue]}}).then(() => {console.log('Ok')})
                await sleep(1000)
            }

        }).catch((err) => {
            console.log(err)
        })
    },
    correctNu: () => {
        const toCompare = new Date(2022, 0, 5).getTime()

        let sumValue = 0.0

        Bill.find({accountNameShow:"Nubank"}).then((nuBills) => {
            for(let oneBill of nuBills){
                if(oneBill.date.getTime() >= toCompare && oneBill.type == 'debit')
                    console.log(oneBill)
            }

            console.log(sumValue)

        }).catch((err) => {
            console.log(err)
        })
    },
    saveBillsToJSON: () => {
        Bill.find().then((allBills) => {
            fs.writeFileSync('./backup/20230828_bills.json', JSON.stringify(allBills));
            console.log('saveBillsToJSON');
        }).catch((err) => {
            console.log(err)
        })
    },
    saveAccountsToJSON: () => {
        Account.find().then((allAccounts) => {
            fs.writeFileSync('./backup/20230828_accounts.json', JSON.stringify(allAccounts));
            console.log('saveAccountsToJSON');
        }).catch((err) => {
            console.log(err)
        })
    },
    saveDebtorsToJSON: () => {
        Debtor.find().then((allDebtors) => {
            fs.writeFileSync('./backup/20230828_debtors.json', JSON.stringify(allDebtors));
            console.log('saveDebtorsToJSON');
        }).catch((err) => {
            console.log(err)
        })
    },
    correctBillsDate: () => {
        Bill.find().lean().then(async (allBills) => {
            for(let oneBill of allBills){
                oneBill.dateInput = oneBill.date.getFullYear() + '-' + ((oneBill.date.getMonth() < 9) ? '0' + (oneBill.date.getMonth() + 1) : (oneBill.date.getMonth() + 1)) + '-' + ((oneBill.date.getDate() <= 9) ? '0' + oneBill.date.getDate() : oneBill.date.getDate())
            
            }

            for(let oneBill of allBills){   
                await sleep(500)   
                console.log(oneBill.dateInput)      
                Bill.findByIdAndUpdate(oneBill._id, oneBill).then().catch((err) => {
                    console.log(err)
                })
            }
            
        }).catch((err) => {
            console.log(err)
        })
    },
    checkBillsDate: () => {
        Bill.find().lean().then(async (allBills) => {
            for(let oneBill of allBills){
                if(!oneBill.dateInput) console.log('No')
                else console.log('Yes')
            }

            
        }).catch((err) => {
            console.log(err)
        })
    }
}



/*
            {
                nameId: 'nubank',
                nameShow: 'Nubank',
                total: 0,
                saved: 0,
                available: 0,
                ccr: 0,
                type: 'checking',
            },
            {
                nameId: 'caixa',
                nameShow: 'Caixa',
                total: 0,
                type: 'saving',
            }



*/





/*
{
    accounts: [
        {
            _id: '7345345345345',
            nameId: 'nubank',
            nameShow: 'Nubank',
            total: 9999.99,
            saved: 5555.55,
            ccr: 1111.11,
            available: 9999.99 - 5555.55,
            type: 'checking',
            bills: [
                {
                    _id: 'dkf378456y38745',
                    debtorNameShow: 'Lucas',
                    date: '2022-01-01',
                    type: 'debit',
                    value: 22.22,
                    info: 'Teste',
                },
                {
                    _id: 'jnknjnjkf9444',
                    debtorNameShow: 'Rute',
                    date: '2022-01-05',
                    type: 'credit',
                    value: 55.22,
                    info: 'Teste22',
                },
                {
                    _id: '7893978543jh',
                    debtorNameShow: 'Aline',
                    date: '2022-01-07',
                    type: 'credit',
                    value: 567.22,
                    info: 'Teste333',
                }

            ]
        },
        {
            _id: '8978098908',
            nameId: 'caixa',
            nameShow: 'Caixa',
            total: 8888.88,
            saved: 0,
            ccr: 0,
            available: 8888.88 - 0,
            type: 'saving',
            bills: [
                {
                    _id: '45673bnfghjnnn',
                    debtorNameShow: 'Ygor',
                    date: '2022-01-01',
                    type: 'debit',
                    value: 242.22,
                    info: 'Teste',
                },
                {
                    _id: 'jhg4r65uytjnj',
                    debtorNameShow: 'João',
                    date: '2022-01-05',
                    type: 'credit',
                    value: 655.22,
                    info: 'Teste22',
                },
                {
                    _id: '12342fvsdgfdfg',
                    debtorNameShow: 'Lucas',
                    date: '2022-01-07',
                    type: 'debit',
                    value: 567.22,
                    info: 'Teste333',
                }
            ]
        }

    ]


    
}
*/