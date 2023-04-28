const express = require('express');
const routerCliente = express.Router();


const path = require ('path')
const db = path.join(__dirname, 'dev.sqlite3');
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: db
    }
 })

routerCliente.use (express.urlencoded())
routerCliente.use(express.json())

routerCliente.get('/cliente', function (req, res) {
    knex.select('*').from('cliente')
    .then (cliente => res.json(cliente))
    .catch (err => res.json ({ message: `Erro ao recuperar cliente: ${err.message}` }))
  })

routerCliente.get('/cliente/:id', (req, res) => {
    knex.select('*').from('cliente')
    .where('id', req.params.id)
    .first()
    .then (cliente => res.json(cliente))
    .catch (err => res.json ({ message: `Erro ao recuperar cliente: ${err.message}` }))
  });

routerCliente.post('/cliente/', (req, res) => {
    knex ('cliente')
        .insert({
            nome: req.body.nome,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            idade: req.body.idade
            })
            .then((result) => {
                let cliente = result[0]
                res.status(200).json({"novo cliente": cliente })
                return
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Erro ao registrar cliente - ' + err.message })
        })
    })

routerCliente.put('/cliente/:id', (req, res) => {
    knex('cliente')
    .where('id', req.params.id)
    .update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        idade: req.body.idade
  }, ["id"])
  .then((result) => {
    let cliente = result[0]
    res.status(200).json({"cliente alterado": cliente })
    return
})
.catch(err => {
    res.status(500).json({
        message: 'Erro ao editadar cliente - ' + err.message })
})

});

// DELETE produto 
routerCliente.delete('/cliente/:id', (req, res) => {
        knex('cliente')
        .where({ id: req.params.id })
        .del()
        .then((result) => {
            let cliente = result[0]
            res.status(200).json({"Cliente excluído da base": cliente })
            return
        })
        .catch(err => {
            res.status(500).json({
                message: 'Erro ao deletar cliente - ' + err.message })
    })
});

module.exports = routerCliente;