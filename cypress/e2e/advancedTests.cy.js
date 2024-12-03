// cypress/e2e/advancedTests.cy.js

describe('Erweiterte Tests für die Kvadur-Frontend-Anwendung', () => {

    // Test 1: Überprüfung der Suchfunktionalität
    it('sollte die Produktsuche korrekt durchführen', () => {
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
                    reviews: [
                        {
                            starAmount: 5,
                            title: "Exzellente Qualität für diesen Preis",
                            text: "Sehr zufrieden mit der Qualität!",
                        },
                    ],
                    fabric: "Baumwolle",
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
                    reviews: [
                        {
                            starAmount: 5,
                            title: "Exzellente Qualität für diesen Preis",
                            text: "Tolles Produkt!",
                        },
                    ],
                    fabric: "Baumwolle",
                },
            ],
        };

        // Intercept API-Aufruf und stelle Mock-Daten bereit
        cy.intercept('GET', 'http://0.0.0.0:46081/products', {
            statusCode: 200,
            body: mockProducts,
        }).as('getProducts');

        // Besuche die Katalogseite
        cy.visit('/catalogue');
        cy.wait('@getProducts');

        // Change language to English to match the placeholder
        cy.get('select.language-switcher').select('EN');

        // Gib einen Suchbegriff ein
        cy.get('input[placeholder="Search..."]').type('Tee');

        // Überprüfe, ob nur relevante Produkte angezeigt werden
        cy.get('.product-card').should('have.length', 1);
        cy.get('.product-card').should('contain.text', 'No Risk No Story Tee');
    });

    // Test 2: Überprüfung der Produktdetailseite
    it('sollte zur Produktdetailseite navigieren und Details anzeigen', () => {
        const mockProduct = {
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
            reviews: [
                {
                    starAmount: 5,
                    title: "Exzellente Qualität für diesen Preis",
                    text: "Sehr zufrieden mit der Qualität!",
                },
            ],
            fabric: "Baumwolle",
        };

        // Intercept API-Aufruf für Produktdetails
        cy.intercept('GET', `http://0.0.0.0:46081/products/${mockProduct.id}`, {
            statusCode: 200,
            body: { product: mockProduct },
        }).as('getProductDetails');

        // Besuche die Produktdetailseite
        cy.visit(`/product/${mockProduct.id}`);
        cy.wait('@getProductDetails');

        // Überprüfe, ob die Produktdetails korrekt angezeigt werden
        cy.get('.product-title').should('contain.text', mockProduct.title);
        cy.get('.product-price').should('contain.text', `${mockProduct.price} ${mockProduct.currency}`);
        cy.get('.product-desc').should('contain.text', mockProduct.desc.join(', '));
        cy.get('.product-guidance').should('contain.text', mockProduct.guidance);
        cy.get('.product-fabric').should('contain.text', mockProduct.fabric);
    });

    // Test 3: Überprüfung des Warenkorbsystems
   /* it('sollte Produkte zum Warenkorb hinzufügen und die Gesamtmenge aktualisieren', () => {
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
                    reviews: [
                        {
                            starAmount: 5,
                            title: "Exzellente Qualität für diesen Preis",
                            text: "Sehr zufrieden mit der Qualität!",
                        },
                    ],
                    fabric: "Baumwolle",
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
                    reviews: [
                        {
                            starAmount: 5,
                            title: "Exzellente Qualität für diesen Preis",
                            text: "Tolles Produkt!",
                        },
                    ],
                    fabric: "Baumwolle",
                },
            ],
        };

        // Intercept API-Aufruf und stelle Mock-Daten bereit
        cy.intercept('GET', 'http://0.0.0.0:46081/products', {
            statusCode: 200,
            body: mockProducts,
        }).as('getProducts');

        // Besuche die Katalogseite
        cy.visit('/catalogue');
        cy.wait('@getProducts');

        // Überprüfe, ob die Produkte geladen wurden
        cy.get('.product-card').should('have.length', 2);

        // Füge das erste Produkt zum Warenkorb hinzu
        cy.get('.product-card').eq(0).find('.buy-button').click();

        // Überprüfe, ob der Warenkorb-Badge aktualisiert wurde
        cy.get('.fa-shopping-cart').parent().should('contain.text', '1');

        // Füge das zweite Produkt hinzu
        cy.get('.product-card').eq(1).find('.buy-button').click();

        // Überprüfe den Warenkorb-Badge erneut
        cy.get('.fa-shopping-cart').parent().should('contain.text', '2');
    });
*/
    // Test 4: Validierung des Kontaktformulars
    it('sollte das Kontaktformular validieren und erfolgreich absenden', () => {
        cy.visit('/contact');

        // Versuch, das Formular ohne Eingaben abzusenden
        cy.get('form').submit();

        // Überprüfe, ob Validierungsfehler angezeigt werden
        cy.get('.error-message').should('have.length.at.least', 1);

        // Fülle das Formular korrekt aus
        cy.get('input[name="name"]').type('Max Mustermann');
        cy.get('input[name="email"]').type('max.mustermann@example.com');
        cy.get('textarea[name="message"]').type('Dies ist eine Testnachricht.');

        // Sende das Formular erneut ab
        cy.get('form').submit();

        // Überprüfe, ob eine Erfolgsmeldung angezeigt wird
        cy.get('.success-message').should('be.visible').and('contain.text', 'Vielen Dank für deine Nachricht!');
    });

    // Test 5: Überprüfung der responsiven Navigation
    it('sollte das Navigationsmenü auf mobilen Geräten korrekt anzeigen', () => {
        // Setze die Viewport-Größe auf ein mobiles Gerät
        cy.viewport('iphone-6');

        cy.visit('/');

        // Überprüfe, ob das mobile Menü-Symbol sichtbar ist
        cy.get('.mobile-menu-icon').should('be.visible');

        // Öffne das mobile Menü
        cy.get('.mobile-menu-icon').click();

        // Überprüfe, ob die Menüelemente angezeigt werden
        cy.get('.mobile-menu').should('be.visible');
        cy.get('.mobile-menu').should('contain.text', 'Katalog');
        cy.get('.mobile-menu').should('contain.text', 'Kontakt');
    });

    // Test 6: Überprüfung von 404-Seiten
    it('sollte eine benutzerdefinierte 404-Seite anzeigen, wenn eine ungültige URL aufgerufen wird', () => {
        cy.visit('/ungueltige-seite', { failOnStatusCode: false });

        // Überprüfe, ob die 404-Seite angezeigt wird
        cy.contains('Seite nicht gefunden').should('be.visible');
        cy.get('.error-404').should('be.visible');
    });

    // Test 7: Überprüfung der Sprachumschaltung
    it('sollte die Sprache der Anwendung ändern können', () => {
        cy.visit('/');

        // Überprüfe, ob die Standard-Sprache Deutsch ist
        cy.contains('Katalog').should('be.visible');

        // Ändere die Sprache zu Englisch
        cy.get('select.language-switcher').select('EN');

        // Überprüfe, ob die Texte auf Englisch aktualisiert wurden
        cy.contains('Catalogue').should('be.visible');
    });

    it('sollte das Instagram-Icon anzeigen und die korrekte URL öffnen', () => {
        cy.visit('/');

        // Überprüfe, ob das Instagram-Icon sichtbar ist
        cy.get('.footer-right a').should('be.visible');

        // Überprüfe, ob der Link zur richtigen Instagram-Seite führt
        cy.get('.footer-right a').should('have.attr', 'href', 'https://www.instagram.com/kvadur/');

        // Überprüfe, ob der Link in einem neuen Tab geöffnet wird
        cy.get('.footer-right a').should('have.attr', 'target', '_blank');

        // Überprüfe, ob 'noopener noreferrer' als Sicherheitsmaßnahme gesetzt ist
        cy.get('.footer-right a').should('have.attr', 'rel', 'noopener noreferrer');
    });
});
