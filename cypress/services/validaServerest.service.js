
export default class ValidaServerest {

    // Validações das ações que podemos realizar na API:
    // Validar a busca usuários
    // Validar o cadastro de novos usuários
    // Validar o login

    // Usuario/login //

    static validarBuscaDeUsuarios(resposta){
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

    static validarCriacaoDeUsuario(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
    }

    static validarLoginComSucesso(resposta){
        expect(resposta.body).to.haveOwnProperty('authorization')
    }

    static validarLoginSemSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Email e/ou senha inválidos')
    }

    // Produtos //

    static validarBuscaDeProdutos(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('nome')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('preco')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao')
    }

    static validarCadastroDeProdutoComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
    }

    static validarlocalizarProdutoComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('_id')
    }

    static validarExcluirProdutoComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso | Nenhum registro excluído')
        expect(resposta.body).to.haveOwnProperty('_id')
    }

        // Carrinhos //

    static validarBuscaDeCarrinhos(resposta){
        expect(resposta.body.quantidade).to.be.greaterThan(0)
    }

}