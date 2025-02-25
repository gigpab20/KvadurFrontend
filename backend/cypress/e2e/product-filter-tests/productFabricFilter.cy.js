"use strict";
describe('Products Filter by Fabric', () => {
    const baseUrl = 'http://localhost:46081/api/products';
    it('should filter products by fabric', () => {
        const fabric = 'Baumwolle';
        cy.request(`${baseUrl}/filter/fabric?value=${fabric}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(product => {
                expect(product.fabric.toLowerCase()).to.eq(fabric.toLowerCase());
            });
        });
    });
});
