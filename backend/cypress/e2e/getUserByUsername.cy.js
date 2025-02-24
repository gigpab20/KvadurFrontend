"use strict";
describe('GET /user/username', () => {
    it('should return a specific user with status 200 and check if username is admin', () => {
        cy.request("http://localhost:46081/api/user/username/admin")
            .then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an("Object");
            expect(res.body).to.have.property('username', 'admin');
            expect(res.body).to.have.property('password');
            expect(res.body).to.have.property('username');
            console.log(res);
        });
    });
});
