// cypress/e2e/catalogue_product_details.cy.js

describe('Katalogseite - Überprüfung der Produktnamen und Preise', () => {
    const mockProducts = {
        products: [
            {
                id: 1,
                title: "No Risk No Story Tee",
                color: "washed black",
                img: "tee",
                price: "31.99",
                currency: "EUR",
            },
            {
                id: 2,
                title: "No Risk No Story Zip-Hoodie",
                color: "washed cream",
                img: "zipper",
                price: "52.99",
                currency: "EUR",
            },
        ],
    };

    beforeEach(() => {
        // API-Aufruf abfangen und Mock-Daten bereitstellen
        cy.intercept('GET', 'http://0.0.0.0:46081/products', {
            statusCode: 200,
            body: mockProducts,
        }).as('getProducts');
    });

    it('sollte die korrekten Produktnamen und Preise anzeigen', () => {
        // Besuchen der Katalogseite
        cy.visit('http://0.0.0.0:46081/catalogue');

        // Warten, bis der API-Aufruf abgeschlossen ist
        cy.wait('@getProducts');

        // Überprüfen der Produktnamen und Preise
        cy.get('.product-card').eq(0).should('contain.text', 'No Risk No Story Tee');
        cy.get('.product-card').eq(0).should('contain.text', '31.99 EUR');
        cy.get('.product-card').eq(1).should('contain.text', 'No Risk No Story Zip-Hoodie');
        cy.get('.product-card').eq(1).should('contain.text', '52.99 EUR');
    });
});
