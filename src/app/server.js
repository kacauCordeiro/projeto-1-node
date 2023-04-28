const express = require ('express')
const morgan = require ('morgan')
const helmet = require ('helmet')

const app = express ()

app.use (morgan("tiny"))
app.use (helmet())

const cors = require('cors');
const path = require ('path')

app.use(cors())
app.use(express.json());

const routerProdutos = require('./api/routes/produtos');
const routerCliente = require('./api/routes/cliente');

app.use('/app', express.static (path.join (__dirname, '/public')));
app.use('/api', routerProdutos);
app.use('/api', routerCliente);
const PORT = 3000;

function onStart(){
    console.log(`servidor rodando na porta ${PORT}`);
}

app.listen(PORT, onStart);

module.exports = app;
