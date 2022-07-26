/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre a rota /carrinhos da API Serverest', () => {
    
    it('CTFP12 - Deve buscar todos os carrinhos cadastrados', () => {
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

        it('CTFP13 - Deve postar um novo carrinho com sucesso', () => {
            Serverest.cadastrarCarrinhoComSucesso().then( res => {
                cy.contractValidation(res, 'post-carrinhos', 201)
                Serverest.salvarIdCarrinho(res)
            })
        })

        it('CTFP14 - Deve buscar carrinho pelo ID', () => {
            Serverest.localizarCarrinhoComSucesso().then( res => {
                expect(res.status).to.be.eq(200)
            })
        })

        it('CTFP15 - Deve concluir compra', () => {
            Serverest.finalizarCompra().then( res => {
                cy.contractValidation(res, 'delete-carrinhos', 200)
            })
        })
    
        it('CTFP16 - Deve cancelar a compra e retornar os produtos para o estoque', () => {
            Serverest.cancelarCompra().then( res => {
                cy.contractValidation(res, 'delete-carrinhos-cancelar', 200)
            })
        })

    })

})