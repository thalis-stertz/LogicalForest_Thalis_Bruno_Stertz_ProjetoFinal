/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ServerestNegativo from '../services/serverestNegativo.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste negativos sobre a rota /carrinhos da API Serverest', () => {

    

     it('CTFN17 - Deve falhar ao tentar cadastrar carrinho devido a ausência do Token de acesso', () => {
        ServerestNegativo.cadastrarCarrinhoSemSucessoSemToken().then( res => {
            expect(res.status).to.be.eq(401)
            cy.contractValidation(res, 'post-carrinhos', 401)
        })
    })

    context('Logar', () => {
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

        it('CTFN16 - Deve falhar ao tentar cadastrar carrinho com outro carrinho já cadastrado', () => {
            ServerestNegativo.cadastrarCarrinhoSemSucesso().then( res => {
                 expect(res.status).to.be.eq(400)
                 cy.contractValidation(res, 'post-carrinhos', 400)
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

        it('CTFN18 - Deve falhar ao buscar carrinho pelo ID', () => {
            ServerestNegativo.localizarCarrinhoSemSucesso().then( res => {
                expect(res.status).to.be.eq(400)
                cy.contractValidation(res, 'get-carrinhos-by-id', 400)
                expect(res.body.message).to.be.eq('Carrinho não encontrado')
            })
        })

        it('CTFN19 - Deve falhar em concluir compra', () => {
            ServerestNegativo.naoFinalizarCompra().then( res => {
                expect(res.status).to.be.eq(401)
                cy.contractValidation(res, 'delete-carrinhos', 401)
                expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            })
        })

        it('CTFN20 - Deve falhar em cancelar a compra e retornar os produtos para o estoque', () => {
            ServerestNegativo.naoCancelarCompra().then( res => {
                expect(res.status).to.be.eq(401)
                cy.contractValidation(res, 'delete-carrinhos-cancelar', 401)
                expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            })
        })

    })

})