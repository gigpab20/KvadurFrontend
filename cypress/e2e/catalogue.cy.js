// cypress/e2e/catalogue.cy.js

describe('Katalogseite Tests', () => {
    const mockProducts = {
        products: [
            {
                id: 1,
                title: "No Risk No Story Tee",
                color: "washed black",
                img: "tee",
                desc: ["240 GSM", "100% Baumwolle", "Oversized Fit"],
                guidance:
                    "Bitte bei 30 Grad pflegeleicht waschen und keinen Weichspüler verwenden.",
                sizes: [
                    { size: "S", stock: 9 },
                    { size: "M", stock: 13 },
                    { size: "L", stock: 11 },
                    { size: "XL", stock: 8 },
                ],
                price: "31.99",
                currency: "EUR",
                reviews: [
                    {
                        starAmount: 5,
                        title: "Exzellente Qualität für diesen Preis",
                        text: "gute diese",
                    },
                ],
                fabric: "Baumwolle",
            },
            {
                id: 2,
                title: "No Risk No Story Zip-Hoodie",
                color: "washed cream",
                img: "zipper",
                desc: [
                    "400 GSM",
                    "100% Baumwolle",
                    "Oversized Fit",
                    "Double Zipper",
                ],
                guidance:
                    "Bitte bei 30 Grad pflegeleicht waschen und keinen Weichspüler verwenden.",
                sizes: [
                    { size: "S", stock: 7 },
                    { size: "M", stock: 9 },
                    { size: "L", stock: 8 },
                    { size: "XL", stock: 4 },
                ],
                price: "52.99",
                currency: "EUR",
                reviews: [
                    {
                        starAmount: 5,
                        title: "Exzellente Qualität für diesen Preis",
                        text: "gute diese",
                    },
                ],
                fabric: "Baumwolle",
            },
        ],
    };

    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3003/products', {
            statusCode: 200,
            body: mockProducts,
        }).as('getProducts');
    });

    it('sollte 2 Produkte anzeigen', () => {
        cy.visit('/catalogue');
        cy.wait('@getProducts');
        cy.get('.product-card').should('have.length', 2);
    });

    it('sollte die korrekten Produktnamen und Preise anzeigen', () => {
        cy.visit('/catalogue');
        cy.wait('@getProducts');

        cy.get('.product-card').eq(0).should('contain.text', 'No Risk No Story Tee');
        cy.get('.product-card').eq(0).should('contain.text', '31.99 EUR');

        cy.get('.product-card').eq(1).should('contain.text', 'No Risk No Story Zip-Hoodie');
        cy.get('.product-card').eq(1).should('contain.text', '52.99 EUR');
    });

    // cypress/e2e/catalogue.cy.js

    it('sollte Produktbilder korrekt laden', () => {
        cy.visit('/catalogue');
        cy.wait('@getProducts');

        cy.get('.product-card').eq(0)
            .find('img')
            .should('have.attr', 'src')
            .and('include', 'tee');

        cy.get('.product-card').eq(1)
            .find('img')
            .should('have.attr', 'src')
            .and('include', 'zipper');
    });

});
