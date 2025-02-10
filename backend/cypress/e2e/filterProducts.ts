describe('Products Sorted', () => {
    const baseUrl = 'https://kakvadur.uber.space/api/products/';
    it('should filter products by color', () => {
        const color = 'washed black';
        cy.request(`${baseUrl}/filter/color?value=${color}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');

            response.body.forEach(product => {
                expect(product.color.toLowerCase()).to.eq(color.toLowerCase());
            });
        });
    });

    it('should filter products by size', () => {
        const size = 'M';
        cy.request(`${baseUrl}/filter/size?value=${size}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');

            response.body.forEach(product => {
                const sizes = product.sizes.map(sizeObj => sizeObj.size.toLowerCase());
                expect(sizes).to.include(size.toLowerCase());
            });
        });
    });

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
