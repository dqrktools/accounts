const fs = require('fs');

const exphbs = require('express-handlebars'); /* Importa o módulo express-handlebars */

var hbs = exphbs.create({});

hbs.handlebars.registerPartial('accountsBodyModal', hbs.handlebars.compile(fs.readFileSync(process.cwd() + '/app/views/partials/allBills/accountsBodyModal.handlebars').toString('utf-8')));
hbs.handlebars.registerPartial('allAccountsBodyModal', hbs.handlebars.compile(fs.readFileSync(process.cwd() + '/app/views/partials/allBills/allAccountsBodyModal.handlebars').toString('utf-8')));

module.exports = {
    oneAccount: (accountObj) => {
        return hbs.handlebars.partials['accountsBodyModal'](accountObj)
    },
    allAccounts: (allBills) => {
        return hbs.handlebars.partials['allAccountsBodyModal']({allBills})
    }
}

