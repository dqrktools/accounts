const   manageBill = require('../modules/manageBill'),
        manageDebtor = require('../modules/manageDebtor');

module.exports = {
    get: async (req, res) => {
        let allDebtors = await manageDebtor.read();

        res.render('index', {allDebtors});
    }
}