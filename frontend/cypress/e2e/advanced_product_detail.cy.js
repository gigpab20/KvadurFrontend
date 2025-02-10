// cypress/e2e/advanced_product_detail.cy.js

describe('Produktdetailseite - Überprüfung der Anzeige', () => {
    it('sollte zur Produktdetailseite navigieren und Details anzeigen', () => {
        const mockProduct = {
            id: 1,
            title: "No Risk No Story Tee",
            color: "washed black",
            img: "tee",
            desc: ["240 GSM", "100% Baumwolle", "Oversized Fit"],
            guidance: "Bitte bei 30 Grad pflegeleicht waschen und keinen Weichspüler verwenden.",
            price: "31.99",
            currency: "EUR",
        };

        // Intercept API-Aufruf für Produktdetails
        cy.intercept('GET', `/products/${mockProduct.id}`, {
            statusCode: 200,
            body: { product: mockProduct },
        }).as('getProductDetails');

        // Besuche die Produktdetailseite
        cy.visit(`http://0.0.0.0:46081/product/${mockProduct.id}`);
        cy.wait('@getProductDetails');

        // Überprüfe, ob die Produktdetails korrekt angezeigt werden
        cy.get('.product-title').should('contain.text', mockProduct.title);
        cy.get('.product-price').should('contain.text', `${mockProduct.price} ${mockProduct.currency}`);
        cy.get('.product-desc').should('contain.text', mockProduct.desc.join(', '));
    });
});
