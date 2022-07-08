/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre a rota /carrinhos da API Serverest', () => {
    
    it('Deve buscar todos os carrinhos cadastrados', () => {
        Serverest.buscarCarrinhos().then( res => {
            ValidaServerest.validarBuscaDeCarrinhos(res)
        })
    })

    context('Logar com sucesso', () => {
        beforeEach('Logar', () => {
        Serverest.buscarUsuarioParaLogin()
        Serverest.buscarProdutoParaCarrinho()
        cy.get('@usuarioLogin').then( usuario => {
            Serverest.logar(usuario).then( res => {
                cy.contractValidation(res, 'post-login', 200)
                ValidaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
                })
            })
        })  

    it('Deve excluir carrinho se existir', () => {
        Serverest.cancelarCompra().then( res => {
            cy.contractValidation(res, 'delete-carrinhos', 200)
        })
    })

    it('Deve postar um novo carrinho com sucesso', () => {
        Serverest.cadastrarCarrinhoComSucesso().then( res => {
            cy.contractValidation(res, 'post-carrinhos', 201)
        })
    })

    it('Deve concluir compra', () => {
        Serverest.finalizarCompra().then( res => {
            cy.contractValidation(res, 'delete-carrinhos', 200)
        })
    })
    
    })




    

})