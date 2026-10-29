# API de Catálogo de Produtos

![Testes da API](https://github.com/priottomarcos7-coder/api-catalogo-produtos/actions/workflows/tests.yml/badge.svg)

API REST de cadastro de produtos, criada para praticar **testes automatizados de API**. O projeto inclui CRUD completo, validações, documentação com Swagger e uma suíte de testes com Cypress que roda automaticamente a cada push, via GitHub Actions.

## Tecnologias

- Node.js e Express (API)
- Swagger UI / OpenAPI 3 (documentação)
- Cypress (testes automatizados de API)
- GitHub Actions (integração contínua)

## Como rodar o projeto

**Pré-requisitos:** Node.js 22 (ou superior) e Git.

```bash
git clone https://github.com/priottomarcos7-coder/api-catalogo-produtos.git
cd api-catalogo-produtos
npm install
npm run dev
```

A API fica disponível em `http://localhost:3333`.

## Documentação

Com a API rodando, abra `http://localhost:3333/docs` para ver a documentação interativa (Swagger) e testar cada rota pelo navegador.

## Endpoints

| Método | Rota | Descrição | Respostas |
|---|---|---|---|
| GET | `/health` | Verifica se a API está no ar | 200 |
| GET | `/produtos` | Lista todos os produtos | 200 |
| GET | `/produtos/:id` | Busca um produto pelo id | 200, 404 |
| POST | `/produtos` | Cria um produto | 201, 400 |
| PUT | `/produtos/:id` | Atualiza um produto | 200, 400, 404 |
| DELETE | `/produtos/:id` | Apaga um produto | 204, 404 |

**Regras de validação:** o `nome` é obrigatório e deve ser um texto não vazio; o `preco` é obrigatório e deve ser um número maior que zero.

> Os dados ficam guardados em memória, então voltam ao estado inicial sempre que a API reinicia.

## Testes automatizados

Os testes cobrem os caminhos de sucesso e os de erro de todas as rotas, e cada teste cria os próprios dados para ser independente dos demais.

Para rodar tudo (liga a API, executa os testes e desliga):

```bash
npm run test:ci
```

Para abrir a interface visual do Cypress (com a API rodando em outro terminal):

```bash
npm run cy:open
```

## Integração contínua

A cada push e pull request na branch `main`, o GitHub Actions instala as dependências, sobe a API e executa os testes. O resultado aparece no selo no topo deste README e na aba **Actions** do repositório.

## Estrutura do projeto

```
├── .github/workflows/tests.yml   # pipeline de CI
├── cypress/e2e/api/produtos.cy.js # testes da API
├── src/
│   ├── app.js                    # rotas da API
│   ├── server.js                 # inicialização do servidor
│   └── docs/openapi.json         # documentação OpenAPI
├── requests.http                 # pedidos para testes manuais
└── cypress.config.js
```

## Autor

Marcos Vinicios