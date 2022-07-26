/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ServerestNegativo from '../services/serverestNegativo.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste negativos sobre a rota /usuarios', () => {
    
    it('CTFN02 - Deve falhar em cadastrar um novo usuário com um email que já está sendo utilizado', () => {
        ServerestNegativo.buscarEmailDeUsuario()
        cy.get('@usuarioEmail').then( email => {
            ServerestNegativo.criarUsuarioSemSucesso(email.email).then( res => {
                cy.contractValidation(res, 'post-usuarios', 400)
                expect(res.body.message).to.be.eq('Este email já está sendo usado')
            })
        })
    })

    it('CTFN03 - Deve falhar ao tentar encontrar um usuário pelo ID', () => {
        ServerestNegativo.buscarUsuarioSemSucesso().then( res => {
            cy.contractValidation(res, 'get-usuarios-by-id', 400)
            expect(res.body.message).to.be.eq('Usuário não encontrado')
        })
    })

    context('Falhar ao excluir um usuário com carrinho', () => {
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

        it('CTFN04 - Deve falhar ao tentar excluir um usuário com carrinho cadastrado', () => {
            ServerestNegativo.deletarUsuarioSemSucesso().then( res => {
                cy.contractValidation(res, 'delete-usuarios-by-id', 400)
                expect(res.body.message).to.be.eq('Não é permitido excluir usuário com carrinho cadastrado')
            })
        })
    })

        it('CTFN05 - Deve falhar em editar um usuário', () => {
            ServerestNegativo.buscarEmailDeUsuario()
            cy.get('@usuarioEmail').then( email => {
                ServerestNegativo.editarUsuarioSemSucesso(email.email).then( res => {
                    cy.contractValidation(res, 'put-usuarios-by-id', 400)
                    expect(res.body.message).to.be.eq('Este email já está sendo usado')
                })
            })
        })

})