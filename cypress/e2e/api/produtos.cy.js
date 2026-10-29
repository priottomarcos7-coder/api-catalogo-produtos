const novoProduto = { nome: "Boné", preco: 39.9 };

function criarProduto(dados = novoProduto) {
  return cy.request({ method: "POST", url: "/produtos", body: dados });
}

describe("API de Catálogo de Produtos", () => {
  describe("GET /health", () => {
    it("deve informar que a API está no ar", () => {
      cy.request("/health").then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.deep.eq({ status: "ok" });
      });
    });
  });

  describe("GET /produtos", () => {
    it("deve listar os produtos, incluindo um recém-criado", () => {
      criarProduto().then((criado) => {
        cy.request("/produtos").then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.an("array");
          const ids = res.body.map((produto) => produto.id);
          expect(ids).to.include(criado.body.id);
        });
      });
    });
  });

  describe("GET /produtos/:id", () => {
    it("deve retornar o produto quando o id existe", () => {
      criarProduto().then((criado) => {
        cy.request(`/produtos/${criado.body.id}`).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.deep.eq(criado.body);
        });
      });
    });

    it("deve retornar 404 quando o id não existe", () => {
      cy.request({ url: "/produtos/999999", failOnStatusCode: false }).then(
        (res) => {
          expect(res.status).to.eq(404);
          expect(res.body.erro).to.eq("Produto não encontrado");
        }
      );
    });
  });

  describe("POST /produtos", () => {
    it("deve criar um produto com dados válidos", () => {
      criarProduto().then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.id).to.be.a("number");
        expect(res.body.nome).to.eq("Boné");
        expect(res.body.preco).to.eq(39.9);
      });
    });

    it("deve retornar 400 quando o nome não é enviado", () => {
      cy.request({
        method: "POST",
        url: "/produtos",
        body: { preco: 39.9 },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.erro).to.contain("nome");
      });
    });

    it("deve retornar 400 quando o preço é negativo", () => {
      cy.request({
        method: "POST",
        url: "/produtos",
        body: { nome: "Meia", preco: -5 },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.erro).to.contain("preco");
      });
    });

    it("deve retornar 400 quando o preço é um texto", () => {
      cy.request({
        method: "POST",
        url: "/produtos",
        body: { nome: "Meia", preco: "barato" },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
      });
    });
  });

  describe("PUT /produtos/:id", () => {
    it("deve atualizar um produto existente", () => {
      criarProduto().then((criado) => {
        cy.request({
          method: "PUT",
          url: `/produtos/${criado.body.id}`,
          body: { nome: "Boné Premium", preco: 79.9 },
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.nome).to.eq("Boné Premium");
          expect(res.body.preco).to.eq(79.9);
        });
      });
    });

    it("deve retornar 400 ao atualizar com dados inválidos", () => {
      criarProduto().then((criado) => {
        cy.request({
          method: "PUT",
          url: `/produtos/${criado.body.id}`,
          body: { nome: "", preco: 10 },
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.eq(400);
        });
      });
    });

    it("deve retornar 404 ao atualizar um produto que não existe", () => {
      cy.request({
        method: "PUT",
        url: "/produtos/999999",
        body: novoProduto,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(404);
      });
    });
  });

  describe("DELETE /produtos/:id", () => {
    it("deve apagar um produto e ele não deve mais ser encontrado", () => {
      criarProduto().then((criado) => {
        cy.request({
          method: "DELETE",
          url: `/produtos/${criado.body.id}`,
        }).then((res) => {
          expect(res.status).to.eq(204);
        });

        cy.request({
          url: `/produtos/${criado.body.id}`,
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
    });

    it("deve retornar 404 ao apagar um produto que não existe", () => {
      cy.request({
        method: "DELETE",
        url: "/produtos/999999",
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(404);
      });
    });
  });
});