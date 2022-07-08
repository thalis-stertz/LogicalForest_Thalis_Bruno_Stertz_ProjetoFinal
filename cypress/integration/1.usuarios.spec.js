/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'


describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

    it('Deve buscar todos os usuarios cadastrados na Serverest', () => {
        Serverest.buscarUsuarios().then( res => {
            cy.contractValidation(res, 'get-usuarios', 200)
            ValidaServerest.validarBuscaDeUsuarios(res)
        })
    })

    it('Deve cadastrar um novo usuário com sucesso', () => {
        Serverest.criarUsuarioComSucesso().then( res => {
            cy.contractValidation(res, 'post-usuarios', 201)
            expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
            Serverest.salvarIdUsuario(res)
        })
    })

    it('Deve realizar login com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then( usuario => {
            Serverest.logar(usuario).then( res => {
                cy.contractValidation(res, 'post-login', 200)
                ValidaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })

    it('Não deve postar um novo usuário administrador existente', () => {
        cy.postarUsuarioSemSucesso().then( res => {
            cy.contractValidation(res, 'post-usuarios', 400)
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
        })
    })

    it('Deve buscar um usuário com sucesso', () => {
        Serverest.buscarUsuarioComSucesso().then( res => {
            cy.contractValidation(res, 'get-usuarios-by-id', 200)
            expect(res.body._id).to.be.eq(`${Cypress.env("idUser")}`)
        })
    })
    
    it('Deletar usuário', () => {
        Serverest.deletarUsuarioComSucesso().then( res => {
            cy.contractValidation(res, 'delete-usuarios-by-id', 200)
        })
    })
   
    it('Deve buscar e salvar em um arquivo json', () => {
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
                cy.contractValidation(res, 'post-login', 200)
                ValidaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })

})