"use strict";

const Account = require('../models/account.model');
const Bill = require('../models/bill.model');
const Debtor = require('../models/debtor.model');
const Fixed = require('../models/fixed.model');

const manageBillModule = require('./manageBill');
const manageAccountModule = require('./manageAccount');
const manageDebtorModule = require('./manageDebtor');

const fs = require('fs');

const ObjectId = require('mongoose').Types.ObjectId

function mountAccount(oneAccount, dateLimit){

    let dateLastMonth = dateLimit.getFullYear() + '-' + (dateLimit.getMonth() < 9 ? '0' + (dateLimit.getMonth() + 1) : dateLimit.getMonth() + 1) + '-' + (dateLimit.getDate() <= 9 ? '0' + dateLimit.getDate() : dateLimit.getDate())   
    
    oneAccount.bills = []
    oneAccount.dateLastMonth = dateLastMonth
    oneAccount.total = oneAccount.total.toFixed(2)
    oneAccount.totalAux = oneAccount.total >= 0 ? 'green': 'red'; 

    if(oneAccount.type == 'checking'){
        oneAccount.ccr = oneAccount.ccr.toFixed(2);
        oneAccount.ccrAux = oneAccount.ccr >= 0 ? 'green': 'red'; 
    }
    
    return oneAccount
}

function mountBillsAll(oneAccount, allBills){

    allBills = allBills.sort((a, b) => b.date - a.date)

    for(let oneBill of allBills){
        oneBill.date = oneBill.date.toDateString(); 
        oneBill.value = oneBill.value.toFixed(2); 
        oneBill.valueAux = oneBill.value >= 0 ? 'green': 'red'; 

        if(oneBill.accountId.equals(oneAccount._id)){
            oneAccount.bills.push(oneBill)
        }
    }
    
    return [oneAccount, allBills]
}

function dataToModalBody(oneAccount, allBills, dateLimit) {
    try{
        let resAccount = mountBillsAll(mountAccount(oneAccount, dateLimit), allBills, dateLimit)
    
        return {modalBodyUpdate: updateModal.oneAccount(resAccount[0]), modalBodyAllUpdate: updateModal.allAccounts(resAccount[1])}
    }catch(err){
        console.log('------------------\n---> Error 1 <---\n------------------\n' + err)
        return err
    }
}

module.exports = {
    createBill: () => {

        const fs = require("fs");
        const { parse } = require("csv-parse");
        
        fs.createReadStream("./nubank-2023-09.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", async function (row) {

                var allNewBills = [],
                    newWho = row[1].split('&')
    
                for(let oneWho of newWho){
                    allNewBills.push({
                        _id: '',
                        accountId: '61e0c746a68e327e330c3b9f',
                        dateInput: row[0],
                        date: new Date(row[0].split('-')),
                        type: 'credit',
                        info: row[2],
                        fate: '',
                        debtorId: oneWho == 'Lucas' ? '61ddbb8eda0b6dd6a28d24be' : '61ddbb8eda0b6dd6a28d24c0',
                        value: parseFloat(row[3]/newWho.length)*(-1),
                    })
                }

                try{                   
                    
                    let nuAccount = await Account.findById('61e0c746a68e327e330c3b9f').lean(),
                        allDebtors = {
                            '61ddbb8eda0b6dd6a28d24be': await Debtor.findById('61ddbb8eda0b6dd6a28d24be').lean(),
                            '61ddbb8eda0b6dd6a28d24c0': await Debtor.findById('61ddbb8eda0b6dd6a28d24c0').lean()
                        }
                
                        
                    for(let oneBill of allNewBills){
                        delete oneBill.fate;
                        delete oneBill._id;
        
                        oneBill.accountId = nuAccount._id
                        oneBill.accountNameShow = nuAccount.nameShow
                        nuAccount.ccr += oneBill.value

                        oneBill.debtorId = allDebtors[oneBill.debtorId]._id
                        oneBill.debtorNameShow = allDebtors[oneBill.debtorId].nameShow
                        allDebtors[oneBill.debtorId].total += oneBill.value
                    }
        
                    for(let oneBill of allNewBills){
                        await manageBillModule.create(oneBill)
                    }

                    await manageAccountModule.findByIdAndUpdateTotalAndCCR(nuAccount)

                    await manageDebtorModule.findByIdAndUpdateTotal(allDebtors['61ddbb8eda0b6dd6a28d24be'])

                    await manageDebtorModule.findByIdAndUpdateTotal(allDebtors['61ddbb8eda0b6dd6a28d24c0'])
        
                    console.log('------------------\n---> Foooooi <---\n------------------\n')
        
                }catch(err) {
                    console.log('------------------\n---> Error 4 <---\n------------------\n' + err)
                };

            })
            .on("end", function () {
                console.log("finished");
            })
            .on("error", function (error) {
                console.log(error.message);
            });














        


    },
}