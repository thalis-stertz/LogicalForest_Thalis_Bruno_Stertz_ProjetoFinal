import Factory from  "../fixtures/factory"


const URL_USUARIOS  = '/usuarios'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {

    // Ações que podemos realizar na API:
    // Buscar usuários
    // Cadastrar novos usuários
    // Realizar login

    // Usuario/Login //

    static buscarUsuarios() {
        return cy.rest('GET', URL_USUARIOS)
    }

    static buscarUsuarioParaLogin() {
        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password
            }).as('usuarioLogin')
        })
    }

    static criarUsuarioComSucesso(){
        let usuario = Factory.gerarUsuario()

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: true,
        })
    }

    static salvarIdUsuario(resposta){
        Cypress.env('idUser', resposta.body._id)
    }


    static logar(usuario) {
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static salvarBearer(resposta){
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }

    static buscarUsuarioComSucesso(){
        return cy.request({
            method: 'GET',
            url: `/usuarios/${Cypress.env("idUser")}`,
            failOnStatusCode: true
        })
    }

    static deletarUsuarioComSucesso(){
        return cy.request({
            method: 'DELETE',
            url: `/usuarios/${Cypress.env("idmacaco")}`,
            failOnStatusCode: true
        })
    }

    // Produtos //

    static buscarProdutos(){
        return cy.rest('GET', URL_PRODUTOS)
    }

    static cadastrarProdutoComSucesso(){
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static salvarIdProduto(resposta){
        Cypress.env('idProduto', resposta.body._id)
    }

    static localizarProdutoComSucesso(){
        return cy.request({
            method: 'GET',
            url: `/produtos/${Cypress.env("idProduto")}`,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static deletarProdutoComSucesso(){
        return cy.request({
            method: 'DELETE',
            url: `/produtos/${Cypress.env("idProduto")}`,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    // Carrinhos //

    static buscarCarrinhos(){
        return cy.rest('GET', URL_CARRINHOS)
    }

    static buscarProdutoParaCarrinho(){
        cy.request(URL_PRODUTOS).then( res => {
            Cypress.env('produtoCarrinho', res.body.produtos[0]._id)
        })
    }

    static cadastrarCarrinhoComSucesso(){
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                "produtos": [
                  {
                    "idProduto": `${Cypress.env("produtoCarrinho")}`,
                    "quantidade": 1
                  }
                ]
              },
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static cancelarCompra(){
        return cy.request({
            method: 'DELETE',
            url: "carrinhos/cancelar-compra",
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static finalizarCompra(){
        return cy.request({
            method: 'DELETE',
            url: "carrinhos/concluir-compra",
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

}