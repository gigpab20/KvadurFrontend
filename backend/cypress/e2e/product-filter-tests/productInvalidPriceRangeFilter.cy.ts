describe('Invalid Price Range Format', () => {
    const baseUrl = 'http://localhost:3003/products';

    it('should return an error for invalid price range format', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/filter/price-range?value=invalid-range`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error', "Invalid price range format. Use 'min-max' format.");
        });
    });
});