const BASE_URL = Cypress.env('BASE_URL')

describe("Criar produto", () => {
    it('Criar um novo produto', () => {
        cy.api({
            method: 'POST',
            url: BASE_URL + '/products',
            body: {
                "title": 'Produto A',
                "price": 123,
                "description": 'Descrição do Produto A',
                "categoryId": 2,
                "images": [
                    'https://i.imgur.com/6Xeqn2s.png'
                ]
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').should((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).to.be.an('object')
            expect(response.body.title).to.equal('Produto A')
        })
    })

    it('Criar um novo produto com categoria invalida', () => {
        cy.api({
            method: 'POST',
            url: BASE_URL + '/products',
            body: {
                "title": 'Produto A',
                "price": 123,
                "description": 'Descrição do Produto A',
                "categoryId": 999,
                "images": [
                    'https://i.imgur.com/6Xeqn2s.png'
                ]
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').should((response) => {
            expect(response.status).to.equal(400)
        })
    })

})

describe("Ler produto", () => {

    it('Ler todos os produtos', () => {
        cy.api({
            method: 'GET',
            url: BASE_URL + '/products',
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.be.an('array')
        })
    })

    it('Ler um produto', () => {
        cy.api({
            method: 'POST',
            url: BASE_URL + '/products',
            body: {
                "title": 'Produto A',
                "price": 123,
                "description": 'Descrição do Produto A',
                "categoryId": 2,
                "images": [
                    'https://i.imgur.com/6Xeqn2s.png'
                ]
            },
            failOnStatusCode: false
        }).then((res) => {

            const productId = res.body.id
            cy.log(productId)
            
            cy.api({
                method: 'GET',
                url: BASE_URL + '/products/' + productId,
                failOnStatusCode: false
            }).as('response')
    
            cy.get('@response').should((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.images).to.be.an('array')
            })
        
        })
    })

    it('Ler um produto inexistente', () => {
        cy.api({
            method: 'GET',
            url: BASE_URL + '/products/999',
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').should((response) => {
            expect(response.status).to.equal(400)
        })
    })

})

describe("Atualizar produto", () => {

    it('Atualizar um produto', () => {

        cy.api({
            method: 'POST',
            url: BASE_URL + '/products',
            body: {
                "title": 'Produto A',
                "price": 123,
                "description": 'Descrição do Produto A',
                "categoryId": 2,
                "images": [
                    'https://i.imgur.com/6Xeqn2s.png'
                ]
            },
            failOnStatusCode: false
        }).then((res) => {

            const productId = res.body.id
            cy.log(productId)

            cy.api({
                method: 'PUT',
                url: BASE_URL + '/products/' + productId,
                body: {
                    "title": 'Produto B',
                    "description": 'Descrição do Produto B',
                    "images": [
                        'https://i.imgur.com/dI7EAC4.png'
                    ]
                },  
                failOnStatusCode: false
                }).as('response')

                cy.get('@response').should((response) => {
                    expect(response.status).to.equal(200)
                })
        })
    })

})

describe("Deletar produto", () => {

    it('Deletar um produto', () => {

        cy.api({
            method: 'POST',
            url: BASE_URL + '/products',
            body: {
                "title": 'Produto A',
                "price": 123,
                "description": 'Descrição do Produto A',
                "categoryId": 2,
                "images": [
                    'https://i.imgur.com/6Xeqn2s.png'
                ]
            },
            failOnStatusCode: false
        }).then((res) => {

            const productId = res.body.id
            cy.log(productId)

            cy.api({
                method: 'DELETE',
                url: BASE_URL + '/products/' + productId,
                failOnStatusCode: false
            }).as('response')

            cy.get('@response').should((response) => {
                expect(response.status).to.equal(200)
            })
        })
    })
})