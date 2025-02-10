// cypress/e2e/catalogue_products_display.cy.js

describe('Katalogseite - Überprüfung der Produktanzahl', () => {
    it('sollte 2 Produkte anzeigen', () => {
        const mockProducts = {
            products: [
                {
                    id: 1,
                    title: "No Risk No Story Tee",
                    color: "washed black",
                    img: "tee",
                    desc: ["240 GSM", "100% Baumwolle", "Oversized Fit"],
                    guidance: "Bitte bei 30 Grad pflegeleicht waschen und keinen Weichspüler verwenden.",
                    sizes: [
                        { size: "S", stock: 9 },
                        { size: "M", stock: 13 },
                        { size: "L", stock: 11 },
                        { size: "XL", stock: 8 },
                    ],
                    price: "31.99",
                    currency: "EUR",
                },
                {
                    id: 2,
                    title: "No Risk No Story Zip-Hoodie",
                    color: "washed cream",
                    img: "zipper",
                    desc: ["400 GSM", "100% Baumwolle", "Oversized Fit", "Double Zipper"],
                    guidance: "Bitte bei 30 Grad pflegeleicht waschen und keinen Weichspüler verwenden.",
                    sizes: [
                        { size: "S", stock: 7 },
                        { size: "M", stock: 9 },
                        { size: "L", stock: 8 },
                        { size: "XL", stock: 4 },
                    ],
                    price: "52.99",
                    currency: "EUR",
                },
            ],
        };

        // API-Aufruf abfangen und Mock-Daten bereitstellen
        cy.intercept('GET', 'http://0.0.0.0:46081/products/', {
            statusCode: 200,
            body: mockProducts,
        }).as('getProducts');

        // Besuchen der Katalogseite
        cy.visit('http://0.0.0.0:46080/catalogue');

        // Warten, bis der API-Aufruf abgeschlossen ist
        cy.wait('@getProducts');

        // Überprüfen, ob genau 2 Produkte angezeigt werden
        cy.get('.product-card').should('have.length', 2);
    });
});
