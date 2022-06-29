it('Deve realizar uma requisição GET a rota /usuarios', () =>{
    cy.request('/usuarios').then( res => {
        expect(res).to.be.a('object')
        cy.log(JSON.stringify(res))
    })
})