/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre a rota /produtos da API Serverest', () => {

    it('CTFP07 - Deve buscar todos os produtos cadastrados', () => {
        Serverest.buscarProdutos().then( res => {
            ValidaServerest.validarBuscaDeProdutos(res)
        })
    })

    context('Logar com sucesso', () => {
        beforeEach('Logar', () => {
            Serverest.criarUsuarioComSucesso().then( res => {
                Serverest.buscarUsuarioParaLogin(res)
            })
        cy.get('@usuarioLogin').then( usuario => {
            Serverest.logar(usuario).then( res => {
                cy.contractValidation(res, 'post-login', 200)
                ValidaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })  

        it('CTFP08 - Deve cadastrar um novo produto com sucesso', () => {
            Serverest.cadastrarProdutoComSucesso().then( res => {
                cy.contractValidation(res, 'post-produtos', 201)
                Serverest.salvarIdProduto(res)
            })
        })
            
        it('CTFP09 - Deve buscar produto por ID', () => {
                Serverest.localizarProdutoComSucesso().then( res => {
                    cy.contractValidation(res, 'get-produtos-by-id', 200)
                })
            })

        it('CTFP10 - Deve editar um produto existente', () => {
                Serverest.editarProduto().then( res => {
                    cy.contractValidation(res, 'put-produtos-by-id', 200)
                    expect(res.body.message).to.be.eq('Registro alterado com sucesso')
                    Serverest.salvarIdProduto(res)
                })
        })

        it('CTFP11 - Deve excluir produto com sucesso', () => {
            Serverest.deletarProdutoComSucesso().then( res => {
                cy.contractValidation(res, 'delete-produtos-by-id', 200)
            })
        })

    })

})