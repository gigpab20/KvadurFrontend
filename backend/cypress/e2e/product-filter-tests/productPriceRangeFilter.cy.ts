describe('Products Filter by Price Range', () => {
    const baseUrl = 'http://0.0.0.0:46081/products';

    it('should filter products by price range', () => {
        const priceRange = '30-60';
        cy.request(`${baseUrl}/filter/price-range?value=${priceRange}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');

            response.body.forEach(product => {
                const price = parseFloat(product.price);
                expect(price).to.be.gte(30).and.lte(60);
            });
        });
    });
});