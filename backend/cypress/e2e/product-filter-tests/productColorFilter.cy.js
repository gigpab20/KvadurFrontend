"use strict";
describe('Filter products with a certain color', () => {
    it('should filter products by color', () => {
        const color = 'washed black';
        cy.request(`http://localhost:46081/api/products/filter/color?value=${color}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(product => {
                expect(product.color.toLowerCase()).to.eq(color.toLowerCase());
            });
        });
    });
});
