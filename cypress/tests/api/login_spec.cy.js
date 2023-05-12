describe('Login via mnemonic API', () => {
    const loginUrl = `${Cypress.env("backendUrl")}/loginWithMnemonic`;

    context("POST /loginWithMnemonic", function () {
        it("posts empty mnemonic to login", function () {
            cy.request("POST", `${loginUrl}`, {
                    mnemonic: ""
                }
            ).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq('success');
            });
        });

        it("posts mnemonic to login", function () {
            cy.request("POST", `${loginUrl}`, {
                    mnemonic: Cypress.env('testMnemonic')
                }
            ).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq('success');
            });
        });
    });
})
