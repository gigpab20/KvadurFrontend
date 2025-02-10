"use strict";
describe('Filter products with a certain size', () => {
    it('should filter products by size', () => {
        const size = 'M';
        cy.request(`https://kakvadur.uber.space/api/products/filter/size?value=${size}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(product => {
                const sizes = product.sizes.map(sizeObj => sizeObj.size.toLowerCase());
                expect(sizes).to.include(size.toLowerCase());
            });
        });
    });
});
