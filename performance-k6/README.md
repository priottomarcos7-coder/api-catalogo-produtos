# Teste de performance com k6

Este diretório contém um teste inicial de carga para a API de Catálogo de Produtos.

## Cenário

- Endpoint: `GET /produtos`
- Usuários virtuais: 5
- Duração: 15 segundos
- Verificações: HTTP 200 e resposta em formato de array JSON
- Tipo: teste curto de carga inicial (não representa um teste de capacidade ou stress)

O teste usa somente uma requisição GET e não altera os dados da API.

## Pré-requisitos

- Node.js 22 ou superior
- k6 instalado e disponível no PATH

## Como executar

1. Na raiz do repositório, instale as dependências (na primeira execução):

   ```bash
   npm install
   ```

2. Em um terminal, inicie a API:

   ```bash
   npm run dev
   ```

3. Em outro terminal, ainda na raiz do repositório, execute:

   ```bash
   k6 run performance-k6/produtos-load-test.js
   ```

A API deve estar disponível em `http://localhost:3333`.

## Salvar um resumo em JSON

Para gerar um arquivo de resumo:

```bash
k6 run --summary-export=performance-k6/resumo-k6.json performance-k6/produtos-load-test.js
```

## Usar outra URL

```bash
k6 run -e BASE_URL=http://localhost:3333 performance-k6/produtos-load-test.js
```

> Execute o teste somente em uma API que você controla ou tem autorização para testar. Comece com esta carga pequena e aumente gradualmente apenas se necessário.
