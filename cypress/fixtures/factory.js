import { faker } from '@faker-js/faker';

export default class Factory {

    static gerarProduto(){
        return {
                "nome": faker.commerce.productName(),
                "preco": faker.datatype.number(),
                "descricao": faker.commerce.productDescription(),
                "quantidade": faker.datatype.number()
        }
    }

    static gerarInteiroAleatorio(){
        return faker.datatype.number(13)
    }

    static gerarUsuario(){
        return {
            "nome": faker.internet.userName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": 'true'
        }
    }

    static editarUsuario(){
        return {
            "nome": faker.internet.userName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": 'true'
        }
    }

    static editarProduto(){
        return {
                "nome": faker.commerce.productName(),
                "preco": faker.datatype.number(),
                "descricao": faker.commerce.productDescription(),
                "quantidade": faker.datatype.number()
        }
    }
    
    static gerarUsuarioParaLogin(){
        return {
            "email": faker.internet.email(),
            "password": faker.internet.password(),
        }
    }

    static produtoIdGerar(){
        return faker.random.numeric(16)
    }

    

}