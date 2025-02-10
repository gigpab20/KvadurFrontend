describe('GET /user', () => {
    it('should return all users with status 200', () => {
        cy.request("http://0.0.0.0:46081/user/")
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.be.an("Object");
                console.log(res);
            })
    });
});
