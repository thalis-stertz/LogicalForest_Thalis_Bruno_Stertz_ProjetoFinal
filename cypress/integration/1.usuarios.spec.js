/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'


describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

    it.only('Deve buscar todos os usuarios cadastrados na Serverest', () => {
        Serverest.buscarUsuarios().then( res => {
            cy.contractValidation(res, 'get-usuarios', 200)
            ValidaServerest.validarBuscaDeUsuarios(res)
        })
    })

    it('Não deve postar um novo usuário administrador existente', () => {
        cy.postarUsuarioSemSucesso().then( res => {
            expect(res).to.be.a('object') 
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
        })
    })
    
    it('Deve realizar login com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then( usuario => {
            Serverest.logar(usuario).then( res => {
                ValidaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })
   
    it('Deve buscar e salvar um em um arquivo json', () => {
        let inteiro = Factory.gerarInteiroAleatorio()
        Serverest.buscarUsuarios().then( res => {
            cy.writeFile('./cypress/fixtures/usuario.json',res.body.usuarios[inteiro])
            ValidaServerest.validarBuscaDeUsuarios(res)
        })
    })

    it('Deve buscar um usuário de um arquivo json', () => {
        cy.fixture('usuario.json').then( json => {
            let usuario = {
                email: json.email,
                password: json.password
            }
            Serverest.logar(usuario).then( res => {
                ValidaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })

})