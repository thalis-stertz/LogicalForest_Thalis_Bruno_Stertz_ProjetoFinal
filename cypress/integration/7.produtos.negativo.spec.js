/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ServerestNegativo from '../services/serverestNegativo.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste negativos sobre a rota /produtos da API Serverest', () => {

    it('CTFN07 - Deve falhar ao tentar cadastrar um produto devido a ausência do Token de acesso', () => {
        ServerestNegativo.cadastrarProdutoSemToken().then( res => {
            cy.contractValidation(res, 'post-produtos', 401)
            expect(res.body.message).to.be.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    context('Deve falhar em encontrar produto', () => {
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

        it('CTFN09 - Não deve encontrar o produto', () => {
            ServerestNegativo.localizarProdutoSemSucesso().then( res => {
                cy.contractValidation(res, 'get-produtos-by-id', 400)
                expect(res.body.message).to.be.eq('Produto não encontrado')
            })
        })
})

    it('CTFN11 - Não deve excluir produto devido a falta de Token de acesso', () => {
        ServerestNegativo.deletarProdutoSemToken().then( res => {
            cy.contractValidation(res, 'delete-produtos-by-id', 401)
            expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('CTFN14 - Não deve editar produto devido a falta de Token de acesso', () => {
        ServerestNegativo.editarProdutoSemToken().then( res => {
            cy.contractValidation(res, 'put-produtos-by-id', 401)
            expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

})