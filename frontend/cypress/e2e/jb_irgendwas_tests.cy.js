describe("Ultra Komplexe Frontend-Tests für Kvadur", () => {

    const mockProductsSuccess = {
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
                desc: ["400 GSM", "100% Baumwolle", "Oversized Fit", "Double Zipper"],
                guidance: "Bitte bei 30 Grad pflegeleicht waschen und keinen Weichspüler verwenden.",
                sizes: [
                    { size: "S", stock: 7 },
                    { size: "M", stock: 9 },
                    { size: "L", stock: 0 }, // Ausverkauft
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

    const mockSingleProduct = {
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
                text: "gute diese",
            },
        ],
        fabric: "Baumwolle",
    };

    // Für Test 2
    const mockProductsError = { products: [] };

    beforeEach(() => {
        // Standard: Erfolgreich
        cy.intercept("GET", "**/products", {
            statusCode: 200,
            body: mockProductsSuccess,
        }).as("getProducts");
    });

    it("1) Sollte Produkte laden und im Katalog anzeigen (Erfolgsszenario)", () => {
        cy.visit("/catalogue");
        cy.wait("@getProducts");

        cy.get(".product-card").should("have.length", 2);
        cy.get(".product-card").eq(0).should("contain.text", "No Risk No Story Tee");
        cy.get(".product-card").eq(1).should("contain.text", "No Risk No Story Zip-Hoodie");
    });

    /*it("2) Sollte Fehlermeldung anzeigen, wenn API 500 zurückgibt", () => {
        // Falls deine App sonst crasht:
        cy.on("uncaught:exception", (err) => {
            return false;
        });
        */


        // Wir überschreiben das Intercept
        //cy.intercept("GET", "**/products", {
        /*
            statusCode: 500,
            body: { error: "Server Error" },
        }).as("getProductsError");

        cy.visit("/catalogue");
        cy.wait("@getProductsError");

        cy.contains("Error").should("be.visible");
    });*/

    //Suchfunktion: Sollte relevante Produkte anzeigen, wenn Suchbegriff eingetippt wird
    it("3) Suchfunktion:  relevante Produkte anzeigen,wenn Suchbegriff eingetippt wird", () => {
        cy.visit("/catalogue");
        cy.wait("@getProducts");

        // Wechsle auf EN (damit placeholder "Search..." existiert)
        cy.get("select.language-switcher").select("EN");
        cy.get('input[placeholder="Search..."]').type("Tee");

        cy.get(".product-card").should("have.length", 1);
        cy.get(".product-card").eq(0).should("contain.text", "No Risk No Story Tee");
    });

    it("4) Language Switch: Sollte Texte auf Englisch anzeigen", () => {
        cy.visit("/");
        cy.contains("Katalog").should("be.visible");

        cy.get("select.language-switcher").select("EN");
        cy.contains("Catalogue").should("be.visible");
    });

    /* it("5) Responsives Menü: Sollte im Mobile-Viewport ein Burger-Menü anzeigen", () => {
         cy.viewport("iphone-6");
         cy.visit("/");
         // Oft ist das Icon hidden => wir nutzen force + warten
         cy.get(".mobile-menu-icon", { timeout: 8000 })
             .scrollIntoView()
             .should("be.visible")
             .click({ force: true });
         // Warte kurz, bis das Menü aufgeklappt ist
         cy.get(".mobile-menu", { timeout: 8000 })
             .should("be.visible");
         // Jetzt checken wir, ob "Katalog" angezeigt wird
         cy.contains("Katalog", { timeout: 8000 }).should("be.visible");
     });
     */

    it("6) Produktdetailseite: Sollte korrekt angezeigt werden", () => {
        cy.intercept("GET", "**/products/1", {
            statusCode: 200,
            body: { product: mockSingleProduct },
        }).as("getSingleProduct");

        cy.visit("/product/1");
        cy.wait("@getSingleProduct");

        cy.get(".product-title").should("contain.text", mockSingleProduct.title);
        cy.get(".product-price").should("contain.text", `${mockSingleProduct.price} ${mockSingleProduct.currency}`);
    });

    /*it("7) Warenkorb-Flow: Mehrere Produkte + unterschiedliche Größen hinzufügen, Summen checken", () => {
        cy.visit("/catalogue");
        cy.wait("@getProducts");
        // 2 product-cards
        cy.get(".product-card").should("have.length", 2);
        // Erstes Produkt => M
        cy.get(".product-card").eq(0).find(".buy-button").click({ force: true });
        cy.get(".size-button").contains("M").click({ force: true });
        cy.get(".add-to-cart-button").click({ force: true });
        // Badge = 1 (evtl. warten, bis re-render)
        cy.get(".fa-shopping-cart", { timeout: 6000 })
            .parent()
            .should("contain.text", "1");
        // Zweites => S (L ist disabled)
        cy.get(".product-card").eq(1).find(".buy-button").click({ force: true });
        cy.get(".size-button").contains("L").should("be.disabled");
        cy.get(".size-button").contains("S").click({ force: true });
        cy.get(".add-to-cart-button").click({ force: true });
        // Badge = 2
        cy.get(".fa-shopping-cart", { timeout: 6000 })
            .parent()
            .should("contain.text", "2");
        // Nun /cart
        cy.visit("/cart");
        // In deinem Cart.tsx steht:
        // <p><strong>Produkt:</strong> {item.product.title}</p>
        // => "Produkt: No Risk No Story Tee"
        cy.contains("Produkt: No Risk No Story Tee", { timeout: 8000 }).should("be.visible");
        cy.contains("Produkt: No Risk No Story Zip-Hoodie").should("be.visible");
        // Summencheck (31.99 + 52.99 = 84.98)
        cy.contains("Gesamt: 84.98 EUR").should("be.visible");
    });
     */

    it("8) Kontaktformular: Validierung (Fehler + Erfolg)", () => {
        cy.visit("/contact");

        // Ohne Eingaben => Fehlermeldung
        cy.get("form").submit();
        cy.get(".error-message").should("have.length.at.least", 1);

        cy.get('input[name="name"]').type("Max Mustermann");
        cy.get('input[name="email"]').type("max@mustermann.de");
        cy.get('textarea[name="message"]').type("Dies ist eine Testnachricht.");

        cy.get("form").submit();
        cy.get(".success-message").should("be.visible").and("contain.text", "Vielen Dank");
    });

    /*it("9) Checkout mit POST: Abschließen einer Bestellung (Mock)", () => {
        cy.visit("/catalogue");
        cy.wait("@getProducts");
        // Produkt (M)
        cy.get(".product-card").eq(0).find(".buy-button").click({ force: true });
        cy.get(".size-button").contains("M").click({ force: true });
        cy.get(".add-to-cart-button").click({ force: true });
        // /checkout
        cy.visit("/checkout");
        // Wir sind im Tab 0 (Warenkorb). Klicken auf "Weiter"
        // "Weiter" hat className="button next-button"
        cy.get(".button.next-button").click(); // => Tab 1 (Versand/Adresse)
        // Jetzt sind die Input-Felder sichtbar (Vorname, etc.)
        cy.get('input[name="firstName"]').type("Max");
        cy.get('input[name="lastName"]').type("Mustermann");
        cy.get('input[name="address"]').type("Musterstraße 1");
        cy.get('input[name="zip"]').type("12345");
        cy.get('input[name="city"]').type("Musterstadt");
        cy.get('input[name="country"]').type("AT");
        // Weiter => Tab 2 (Zahlung)
        cy.get(".button.next-button").click();
        // Wähle Payment
        cy.get("select.input-field").select("paypal"); // oder "creditCard"
        // Weiter => Tab 3 (Review)
        cy.get(".button.next-button").click();
        // Mock für POST /checkout
        cy.intercept("POST", "**/ /*checkout", {
            statusCode: 200,
            body: { success: true, orderId: 9999 },
        }).as("postCheckout");
        // "type=submit"-Button => "Jetzt kaufen"
        cy.get('button[type="submit"]').click();
        cy.wait("@postCheckout");
        // Erfolgsmeldung
        // Du müsstest in handleSubmit() z.B. "Vielen Dank für deine Bestellung" oder so
        // oder "Bestellung erfolgreich!" im UI zeigen. Sonst findet Cypress nichts.
        cy.contains("Bestellung erfolgreich!").should("be.visible");
        cy.contains("Bestellnummer: 9999").should("be.visible");
    });
*/


    it("10) 404-Seite: Sollte 404 anzeigen, wenn eine ungültige Route aufgerufen wird", () => {
        cy.visit("/irgendwas-total-falsches", { failOnStatusCode: false });
        cy.contains("Seite nicht gefunden").should("be.visible");
        cy.get(".error-404").should("be.visible");
    });

});