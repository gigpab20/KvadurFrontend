"use strict";
describe('GET /products', () => {
    it('should return all Products with status 200', () => {
        cy.request("https://kakvadur.uber.space/api/products/")
            .then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("products");
            expect(res.body.products).to.be.an("array");
            res.body.products.forEach(product => {
                expect(product).to.have.all.keys("id", "title", "color", "img", "desc", "guidance", "sizes", "price", "currency", "reviews", "fabric");
                expect(product.id).to.be.a("number");
                expect(product.title).to.be.a("string");
                expect(product.color).to.be.a("string");
                expect(product.img).to.be.a("string");
                expect(product.desc).to.be.an("array").that.is.not.empty;
                expect(product.guidance).to.be.a("string");
                expect(product.sizes).to.be.an("array").that.is.not.empty;
                expect(product.price).to.match(/^\d+(\.\d{2})?$/);
                expect(product.currency).to.be.a("string").that.equals("EUR");
                expect(product.reviews).to.be.an("array");
                expect(product.fabric).to.be.a("string");
            });
        });
    });
    it('should validate size constraints for all products', () => {
        cy.request("https://kakvadur.uber.space/api/products/")
            .then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.products).to.be.an("array");
            res.body.products.forEach(product => {
                product.sizes.forEach(size => {
                    expect(size.size).to.match(/^[SMLXL]+$/);
                    expect(size.stock).to.be.a("number").that.is.gte(0);
                });
            });
        });
    });
    it('should validate review constraints for all products', () => {
        cy.request("https://kakvadur.uber.space/api/products/")
            .then((res) => {
            expect(res.status).to.eq(200);
            res.body.products.forEach(product => {
                product.reviews.forEach(review => {
                    expect(review.starAmount).to.be.a("number").that.is.within(1, 5);
                    expect(review.title).to.be.a("string").that.is.not.empty;
                    expect(review.text).to.be.a("string").that.is.not.empty;
                });
            });
        });
    });
});
