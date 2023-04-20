const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

const produtossRouter = require('./routes/produtos');

app.use('/api', produtossRouter);
const PORT = 3000;

function onStart(){
    console.log(`servidor rodando na porta ${PORT}`);
}

app.listen(PORT, onStart);

module.exports = app;
