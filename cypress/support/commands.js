Cypress.Commands.add('login', (login) => {
    login = login ?? Cypress.env('testMnemonic')
    cy.visit('/')
    cy.get('#login_button').click()
    cy.get('#import_mnemonic').type(login)
    cy.get('#sign_in_button').click()
})

Cypress.Commands.add('loginApi', (login) => {
    login = login ?? Cypress.env('testMnemonic')
    cy.request("POST", `${Cypress.env("backendUrl")}/loginWithMnemonic`, {
            mnemonic: login
        }
    );
})
