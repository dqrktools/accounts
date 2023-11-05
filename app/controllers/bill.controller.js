const manageBill = require('../modules/manageBill');
const exphbs = require('express-handlebars'); /* Importa o módulo express-handlebars */
const fs = require('fs');
const Bill = require('../models/bill.model');

var hbs = exphbs.create({});
const ObjectId = require('mongoose').Types.ObjectId;
const allMonths = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

hbs.handlebars.registerPartial('tableBillsTemplate', hbs.handlebars.compile(fs.readFileSync(process.cwd() + '/app/views/partials/tableBills.handlebars').toString('utf-8')));

module.exports = {
    read: async (req, res) => {
        res.end(JSON.stringify(await manageBill.read(req.params.billId)));
    },
    readByDebtor: async (req, res) => {
        let allBillsDebtor = await manageBill.readByDebtor(req.params.debtorId),
            debtorTotal = 0.0,
            tableBills;

        allBillsDebtor = allBillsDebtor.sort((a, b) => b.date - a.date);
        allBillsDebtor.forEach(((item) => {debtorTotal += item.value; item['valueShow'] = item.value.toFixed(2);}));

        tableBills = hbs.handlebars.partials['tableBillsTemplate']({allBillsDebtor});

        res.end(JSON.stringify({tableBills, debtorTotal}));
    },
    createOrUpdate: async (req, res) => {
        let billObj = req.body,
            billId = billObj._id,
            isOK;

        delete billObj._id;

        billObj['balance'] = billObj.value < 0 ? 'red' : 'green';
        billObj['date'] = new Date(billObj.dateInput.split('-'));
        billObj['dateFull'] =   (billObj.date.getDate() <= 9 ? '0' + billObj.date.getDate() : billObj.date.getDate()) + '/' + 
                                allMonths[billObj.date.getMonth()] + '/' + 
                                billObj.date.getFullYear(); 
        billObj['dateShort'] =  (billObj.date.getDate() <= 9 ? '0' + billObj.date.getDate() : billObj.date.getDate()) + '/' + 
                                (billObj.date.getMonth() < 9 ? '0' + (billObj.date.getMonth() + 1) : billObj.date.getMonth() + 1) + '/' + 
                                billObj.date.getFullYear().toString().substring(2); 

        try{
            if(billId == ''){
                await manageBill.create(billObj);
            }
            else{
                await Bill.findByIdAndUpdate(billId, billObj);
            }
            isOK = true;
        }
        catch(e) {
            console.log(e);
            isOK = false;
        }

        res.end(JSON.stringify({isOK}));
    },
    deleteBill: async (req, res) => {
        let isOK;
        
        try{
            await Bill.findByIdAndDelete(req.body._id);
            isOK = true;
        }
        catch(e) {
            console.log(e);
            isOK = false;
        }

        res.end(JSON.stringify({isOK}));
    },
    updateValues: async (req, res) => {
        let isOK;

        try{
            let allBills = await Bill.find().lean();
            fs.writeFileSync('./static/js/values.js', 'var allBills = ' + JSON.stringify(allBills));
            isOK = true;
        }
        catch(e) {
            console.log(e);
            isOK = false;
        }

        res.end(JSON.stringify({isOK}));
    }
}