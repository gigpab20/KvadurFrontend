// cypress/e2e/advanced_search_functionality.cy.js

describe('Produktsuche - Überprüfung der Suchfunktionalität', () => {
    it('sollte die Produktsuche korrekt durchführen', () => {
        const mockProducts = {
            products: [
                {
                    id: 1,
                    title: "No Risk No Story Tee",
                    color: "washed black",
                    img: "tee",
                    desc: ["240 GSM", "100% Baumwolle", "Oversized Fit"],
                },
                {
                    id: 2,
                    title: "No Risk No Story Zip-Hoodie",
                    color: "washed cream",
                    img: "zipper",
                    desc: ["400 GSM", "100% Baumwolle", "Oversized Fit", "Double Zipper"],
                },
            ],
        };

        // Intercept API-Aufruf und stelle Mock-Daten bereit
        cy.intercept('GET', 'http://0.0.0.0:46080/products', {
            statusCode: 200,
            body: mockProducts,
        }).as('getProducts');

        // Besuche die Katalogseite
        cy.visit('http://0.0.0.0:46080/catalogue');
        cy.wait('@getProducts');

        // Gib einen Suchbegriff ein
        cy.get('input[placeholder="Search..."]').type('Tee');

        // Überprüfe, ob nur relevante Produkte angezeigt werden
        cy.get('.product-card').should('have.length', 1);
        cy.get('.product-card').should('contain.text', 'No Risk No Story Tee');
    });
});
