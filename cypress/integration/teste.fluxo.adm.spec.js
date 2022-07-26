/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste de fluxo para administradores da API Serverest', () => {
    
    context('CTFP01 - Fluxo de compra', () => {
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

        it('Deve cadastrar um novo produto', () => {
            Serverest.cadastrarProdutoComSucesso().then( res => {
                cy.contractValidation(res, 'post-produtos', 201)
                Serverest.salvarIdProduto(res)
            })
        })

        it('Deve buscar produto', () => {
            Serverest.localizarProdutoComSucesso().then( res => {
                cy.contractValidation(res, 'get-produtos-by-id', 200)
            })
        })

        it('Deve excluir carrinho se existir', () => {
            Serverest.cancelarCompra().then( res => {
                cy.contractValidation(res, 'delete-carrinhos', 200)
            })
        })

        it('Deve cadastrar novo carrinho', () => {
            Serverest.cadastrarCarrinhoComSucesso().then( res => {
                cy.contractValidation(res, 'post-carrinhos', 201)
                Serverest.salvarIdCarrinho(res)
            })
        })

        it('Deve concluir compra', () => {
            Serverest.finalizarCompra().then( res => {
                cy.contractValidation(res, 'delete-carrinhos', 200)
            })
        })

    })

    context('CTFP02 - Fluxo de edição de produto', () => {
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

        it('Deve cadastrar um novo produto', () => {
            Serverest.cadastrarProdutoComSucesso().then( res => {
                cy.contractValidation(res, 'post-produtos', 201)
                Serverest.salvarIdProduto(res)
            })
        })
            
        it('Deve buscar produto', () => {
                Serverest.localizarProdutoComSucesso().then( res => {
                    cy.contractValidation(res, 'get-produtos-by-id', 200)
                })
            })

        it('Deve editar o produto', () => {
                Serverest.editarProduto().then( res => {
                    cy.contractValidation(res, 'put-produtos-by-id', 200)
                    expect(res.body.message).to.be.eq('Registro alterado com sucesso')
                    Serverest.salvarIdProduto(res)
                })
        })
    })

    context('CTFP03 - Fluxo de exclusão de produto', () => {
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

        it('Deve cadastrar um novo produto', () => {
            Serverest.cadastrarProdutoComSucesso().then( res => {
                cy.contractValidation(res, 'post-produtos', 201)
                Serverest.salvarIdProduto(res)
            })
        })
            
        it('Deve buscar produto', () => {
            Serverest.localizarProdutoComSucesso().then( res => {
                cy.contractValidation(res, 'get-produtos-by-id', 200)
            })
        })

        it('Deve excluir produto', () => {
            Serverest.deletarProdutoComSucesso().then( res => {
                cy.contractValidation(res, 'delete-produtos-by-id', 200)
            })
        })
    
    })

})    