"use strict";
describe('Invalid Filter Mode', () => {
    const baseUrl = 'http://0.0.0.0:46081/products';
    it('should return an error for an invalid filter mode', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/filter/invalid-mode?value=test`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error', 'Invalid filter mode');
        });
    });
});
