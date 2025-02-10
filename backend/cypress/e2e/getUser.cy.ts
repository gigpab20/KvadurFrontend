describe('GET /user', () => {
    it('should return all users with status 200', () => {
        cy.request("https://kakvadur.uber.space/api/user/")
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.be.an("Object");
                console.log(res);
            })
    });
});
