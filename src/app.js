const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./docs/openapi.json");

const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

let produtos = [
    { id: 1, nome: "camiseta", preco: 59.9 },
    { id: 2, nome: "tênis", preco: 249.9 },
];
let proximoId = 3;

function validarProduto(corpo) {
    const { nome, preco } = corpo ?? {};

    if (typeof nome !== "string" || nome.trim() === "") {
        return "O campo 'nome' é obrigatório e deve ser um texto.";
    }
    if (typeof preco !== "number" || preco <= 0) {
        return "O campo 'preco' é obrigatório e deve ser um número maior que zero.";
    }
    return null;
}

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});

app.get("/produtos/:id", (req, res) => {
    const produto = produtos.find((p) => p.id === Number(req.params.id));

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }
    res.status(200).json(produto);
});

app.post("/produtos", (req, res) => {
    const erro = validarProduto(req.body);
    if (erro) {
        return res.status(400).json({ erro });
    }

    const produto = {
        id: proximoId++,
        nome: req.body.nome.trim(),
        preco: req.body.preco,
    };

    produtos.push(produto);
    res.status(201).json(produto);
});

app.put("/produtos/:id", (req, res) => {
    const produto = produtos.find((p) => p.id === Number(req.params.id));
    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }

    const erro = validarProduto(req.body);
    if (erro) {
        return res.status(400).json({ erro });
    }

    produto.nome = req.body.nome.trim();
    produto.preco = req.body.preco;
    res.status(200).json(produto);
});

app.delete("/produtos/:id", (req, res) => {
    const existe = produtos.some((p) => p.id === Number(req.params.id));
    if (!existe) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }

    produtos = produtos.filter((p) => p.id !== Number(req.params.id));
    res.status(204).send();
});

module.exports = app;