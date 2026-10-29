const express = require ("express");

const app = express();
app.use(express.json());

const produtos = [
    {id: 1, nome: "camiseta", preco: 59.9},
    {id: 2, nome: "tênis", preco: 249.9},
];

app.get("/health", (req, res) => {
    res.status(200).json({status: "ok"});
});

app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});

module.exports = app;