const express = require('express');
const router = require('express').Router();
const data = require('../files/produtos.json');
const fs = require("fs");

router.use(express.json())

router.get('/produtos', (req, res) => {
    res.json(data.produtos)
});
// Get de todos os produtos
router.get('/produtos/:id', (req, res) => {
    res.json(data.produtos[req.params.id - 1])
});
// Get de um prduto especifico
router.post('/produtos/', (req, res) => {
    const novoProduto = req.body;
    console.log(novoProduto);
    novoProduto.id = data.produtos.length + 1;
    data.produtos.push(novoProduto);
    fs.writeFile('./produtos.json', JSON.stringify(data), (err, result) => {
        if (err) console.log("error", err);
      });
    
    res.json(novoProduto);

});

// Update um produto especifico
router.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateProduto = req.body;
    const index = data.produtos.findIndex(produto => produto.id === id);
    console.log(index);
    if (index !== -1) {
        data.produtos[index] = updateProduto;
        fs.writeFile('./produtos.json', JSON.stringify(data), (err, result) => {
            if (err) console.log("error", err);
          });
        res.json(updateProduto);
    }else{
        res.sendStatus(404);
    }
});

// DELETE produto 
router.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
        data.produtos.splice(index, 1);
        fs.writeFile('./produtos.json', JSON.stringify(data), (err, result) => {
            if (err) console.log("error", err);
          });
        res.sendStatus(204);
    }else{
        res.sendStatus(404);
    }
});

module.exports = router;