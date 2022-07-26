/// <reference types="cypress" />

import ServerestNegativo from '../services/serverestNegativo.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste negativos sobre a rota /login da API Serverest', () => {

    it('CTFN01 - Não deve realizar login', () => {
        ServerestNegativo.logarSemSucesso().then( res => {
            cy.contractValidation(res, 'post-login', 401)
            expect(res.body.message).to.be.eq('Email e/ou senha inválidos')
            ValidaServerest.validarLoginSemSucesso(res)
        })
    })
})