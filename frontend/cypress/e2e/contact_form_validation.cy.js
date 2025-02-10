// cypress/e2e/contact_form_validation.cy.js

describe('Kontaktformular - Validierung und Absenden', () => {
    it('sollte das Kontaktformular validieren und erfolgreich absenden', () => {
        cy.visit('http://0.0.0.0:46080/contact');

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
});
