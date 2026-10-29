# Product Catalog API

![API Tests](https://github.com/priottomarcos7-coder/api-catalogo-produtos/actions/workflows/tests.yml/badge.svg)

A REST API for product management, created to practice **automated API testing**. The project includes full CRUD functionality, input validation, Swagger documentation, and a Cypress test suite that runs automatically on every push through GitHub Actions.

🌐 **[Leia esta versão em português](README.md)**

## Technologies

- Node.js and Express (API)
- Swagger UI / OpenAPI 3 (documentation)
- Cypress (automated API tests)
- GitHub Actions (continuous integration)

## Running the Project

**Prerequisites:** Node.js 22 or later and Git.

```bash
git clone https://github.com/priottomarcos7-coder/api-catalogo-produtos.git
cd api-catalogo-produtos
npm install
npm run dev
```

The API will be available at `http://localhost:3333`.

## Documentation

With the API running, open `http://localhost:3333/docs` to view the interactive documentation (Swagger) and test each route in your browser.

## Endpoints

| Method | Route | Description | Responses |
|---|---|---|---|
| GET | `/health` | Checks whether the API is running | 200 |
| GET | `/produtos` | Lists all products | 200 |
| GET | `/produtos/:id` | Retrieves a product by ID | 200, 404 |
| POST | `/produtos` | Creates a product | 201, 400 |
| PUT | `/produtos/:id` | Updates a product | 200, 400, 404 |
| DELETE | `/produtos/:id` | Deletes a product | 204, 404 |

**Validation rules:** `nome` (name) is required and must be a non-empty string; `preco` (price) is required and must be a number greater than zero.

> Data is stored in memory, so it returns to its initial state whenever the API restarts.

## Automated Tests

The tests cover both successful and error scenarios for all routes. Each test creates its own data to remain independent from the others.

To run the full suite (start the API, run the tests, and stop the API):

```bash
npm run test:ci
```

To open the Cypress interactive interface (with the API running in another terminal):

```bash
npm run cy:open
```

## Continuous Integration

On every push and pull request to the `main` branch, GitHub Actions installs dependencies, starts the API, and runs the tests. The result is shown in the badge at the top of this README and in the repository's **Actions** tab.

## Project Structure

```
├── .github/workflows/tests.yml    # CI pipeline
├── cypress/e2e/api/produtos.cy.js # API tests
├── src/
│   ├── app.js                     # API routes
│   ├── server.js                  # Server startup
│   └── docs/openapi.json          # OpenAPI documentation
├── requests.http                  # Requests for manual testing
└── cypress.config.js
```

## Author

Marcos Vinicios
