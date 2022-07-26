import Factory from  "../fixtures/factory"
import { faker } from '@faker-js/faker';


const URL_USUARIOS  = '/usuarios'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class ServerestNegativo {

    // Ações que podemos realizar na API:
    // Buscar usuários
    // Cadastrar novos usuários
    // Realizar login

    // Usuario/Login //

    static logarSemSucesso(){
        let usuario = Factory.gerarUsuarioParaLogin()
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static buscarUsuarios() {
        return cy.rest('GET', URL_USUARIOS)
    }

    static buscarUsuarioParaLoginNaoAdm(){
        let i = 0
        cy.request(URL_USUARIOS).then( res => {
            while (res.body.usuarios[i].administrador === "true"){
                i++
            }
            cy.wrap({
                email: res.body.usuarios[i].email,
                password: res.body.usuarios[i].password,
            }).as('usuarioNaoAdm')
        })
    }

    static criarUsuarioComSucesso(){
        let usuario = Factory.gerarUsuario()
        Cypress.env('EmailUser', usuario.email)

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: true,
        })
    }

    static criarUsuarioNaoAdministrador(){
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: {
                "nome": faker.internet.userName(),
                "email": faker.internet.email(),
                "password": faker.internet.password(),
                "administrador": 'false'
            },
            failOnStatusCode: true,
        })
    }

    static criarUsuarioSemSucesso(email){
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: {
                "nome": faker.internet.userName(),
                "email": email,
                "password": faker.internet.password(),
                "administrador": 'true'
            },
            failOnStatusCode: false,
        })
    }

    static editarUsuarioSemSucesso(email){
        return cy.request({
            method: 'PUT',
            url: `/usuarios/${Cypress.env("idmamaco")}`,
            body: {
                "nome": faker.internet.userName(),
                "email": email,
                "password": faker.internet.password(),
                "administrador": 'true'
            },
            failOnStatusCode: false,
        })
    }

    static buscarEmailDeUsuario() {

        cy.request(URL_USUARIOS).then( res => {
            cy.wrap({
                email: res.body.usuarios[0].email
            }).as('usuarioEmail')
        })
    }

    static salvarIdUsuario(resposta){
        Cypress.env('idUser', resposta.body._id)
    }

    static salvarEmailUsuario(resposta){
        Cypress.env('EmailUser', resposta.body.email)
    }

    static logar(usuario) {
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static buscarUsuarioComSucesso(){
        return cy.request({
            method: 'GET',
            url: `/usuarios/${Cypress.env("idUser")}`,
            failOnStatusCode: true
        })
    }

    static buscarUsuarioSemSucesso(){
        return cy.request({
            method: 'GET',
            url: `/usuarios/${Cypress.env("idmamaco")}`,
            failOnStatusCode: false
        })
    }

    static deletarUsuarioComSucesso(){
        return cy.request({
            method: 'DELETE',
            url: `/usuarios/${Cypress.env("idUser")}`,
            failOnStatusCode: true
        })
    }

    static deletarUsuarioSemSucesso(){
        return cy.request({
            method: 'DELETE',
            url: `/usuarios/${Cypress.env("idUser")}`,
            failOnStatusCode: false
        })
    }

    static editarUsuario(){
        return cy.request({
            method: 'PUT',
            url: `/usuarios/${Cypress.env("idUser")}`,
            body: {
                "nome": "Fulano da Silva",
                "email": Cypress.env('EmailUser'),
                "password": "teste",
                "administrador": "true"
            },
            failOnStatusCode: true,
        })
    }

    // Produtos //

    static salvarBearer(resposta){
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }

    static buscarProdutos(){
        return cy.rest('GET', URL_PRODUTOS)
    }

    static salvarNomeProduto(resposta){
        Cypress.env('NameProduct', resposta.body.name)
    }

    static cadastrarProdutoSemSucesso(){
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                "nome": Cypress.env('NameProduct'),
                "preco": faker.datatype.number(),
                "descricao": faker.commerce.productDescription(),
                "quantidade": faker.datatype.number()
            },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
        
    }

    static salvarCadastroProduto(resposta){
        Cypress.env('cadastroProduto', resposta.body.cadastro)
    }

    static buscarProdutoParaCadastro(){
        cy.request(URL_PRODUTOS).then( res => {
            cy.wrap({
                nome: res.body.produtos[0].nome,
                preco: res.body.produtos[0].preco,
                descricao: res.body.produtos[0].descricao,
                quantidade: res.body.produtos[0].quantidade,
            }).as('produtoCadastro')
            Cypress.env('cadastroProduto', res.body.cadastro)
        })
    }

    static cadastrarProdutoSemToken(){
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                "nome": faker.commerce.productName(),
                "preco": faker.datatype.number(),
                "descricao": faker.commerce.productDescription(),
                "quantidade": faker.datatype.number()
            },
            failOnStatusCode: false
        })
    }

    static cadastrarProdutoUsuarioNaoAdministrador(){
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                "nome": faker.commerce.productName(),
                "preco": faker.datatype.number(),
                "descricao": faker.commerce.productDescription(),
                "quantidade": faker.datatype.number()
            },
            failOnStatusCode: false,
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

    static localizarProdutoSemSucesso(){
        let product = Factory.produtoIdGerar()

        return cy.request({
            method: 'GET',
            url: `/produtos/${product}`,
            failOnStatusCode: false,
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

    static deletarProdutoSemToken(){
        return cy.request({
            method: 'DELETE',
            url: `/produtos/${Cypress.env("idProduto")}`,
            failOnStatusCode: false,
        })
    }

    static salvarNomeDoProduto(resposta){
        Cypress.env('ProductName', resposta.body.nome)
    }

    static editarProduto(){
        let produto = Factory.editarProduto()
        return cy.request({
            method: 'PUT',
            url: `/produtos/${Cypress.env("idProduto")}`,
            body: produto, 
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static editarProdutoSemToken(){
        return cy.request({
            method: 'PUT',
            url: `/produtos/${Cypress.env("idProduto")}`,
            body: {
                "nome": faker.commerce.productName(),
                "preco": faker.datatype.number(),
                "descricao": faker.commerce.productDescription(),
                "quantidade": faker.datatype.number()
            },
            failOnStatusCode: false,
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

    static cadastrarCarrinhoSemSucesso(){
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                "produtos": [
                  {
                    "idProduto": `${Cypress.env("produtoCarrinho")}`,
                    "quantidade": faker.datatype.number()
                  }
                ]
              },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static cadastrarCarrinhoSemSucessoSemToken(){
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {
                "produtos": [
                  {
                    "idProduto": `${Cypress.env("produtoCarrinho")}`,
                    "quantidade": faker.datatype.number()
                  }
                ]
              },
            failOnStatusCode: false,
        })
    }

    static localizarCarrinhoSemSucesso(){
        return cy.request({
            method: 'GET',
            url: `/carrinhos/${Cypress.env("idCarrinho")}`,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }


    static naoCancelarCompra(){
        return cy.request({
            method: 'DELETE',
            url: "carrinhos/cancelar-compra",
            failOnStatusCode: false,
        })
    }

    static naoFinalizarCompra(){
        return cy.request({
            method: 'DELETE',
            url: "carrinhos/concluir-compra",
            failOnStatusCode: false,
        })
    }

}