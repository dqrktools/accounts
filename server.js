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
