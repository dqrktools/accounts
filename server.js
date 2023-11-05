/* Módulos */
require('dotenv').config(); /* Configuração das variáveis de ambiente */
const app = require('./configs/app'); /* Configuração do app */
const database = require('./configs/database'); /* Configuração do BD */

const indexRouter = require('./app/routes/index.route'); /* Importa a rota / */
const billRouter = require('./app/routes/bill.route'); /* Importa a rota / */

/* Constante */
const PORT = process.env.PORT || 4080; /* Define a porta na qual a aplicação vai rodar */

/* Rotas */
app.use(indexRouter); /* Adiciona ao middleware a rota / */
app.use(billRouter); /* Adiciona ao middleware a rota /bill */

/* Abre o servidor na porta especificada */
app.listen(PORT, () => {
	console.log( '\n##### -- Server Running: Success\nLink: http://localhost:' + PORT + '\n');
});

const manageBill = require('./app/modules/manageBill');

//manageBill.correctBill();
//manageBill.count();

//manageBill.saveValues();

/*
//manageBill.deleteAll();

var allBills = 
insertAllBills()

console.log(allBills.length)

async function insertAllBills(){
	for(let oneBill of allBills){

		let newBill = {
			'debtorId': oneBill.debtorId,
			'date': oneBill.date,
			'dateInput': oneBill.dateInput,
			'value': oneBill.value,
			'info': oneBill.info,
		}
	
		manageBill.create(newBill)
		await sleep(100);
	}	
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

*/