describe('Login', () => {
    it('successfully opens login modal', () => {
        cy.visit('/')
        cy.get('#login_button').click()

        cy.get('.modal-dialog').should('be.visible')
    })

    it('contains all expected text in the login modal', () => {
        cy.visit('/')
        cy.get('#login_button').click()

        cy.get('[data-cy="modal-title"]').should('have.text', 'Login')
            .should('be.visible')

        cy.get('[data-cy="enter-mnemonic-text"]').should('have.text', 'Please enter the mnemonic:')
            .should('be.visible')

        cy.get('[data-cy="generate-mnemonic-text"]').should('have.text', 'If you don\'t have a mnemonic phrase you can generate a new one.')
            .should('be.visible')

        cy.get('[data-cy="save-mnemonic-text"]').should('have.text', 'Site doesn\'t store your seed phrases, so remember to save it before proceeding!')
            .should('be.visible')

        cy.get('#generate_mnemonic').should('have.text', 'Generate new')
            .should('be.visible')

        cy.get('#import_mnemonic').should('have.attr', 'placeholder', 'your mnemonic phrase')
            .should('be.visible')

        cy.get('#sign_in_button').should('have.text', 'Sign In')
            .should('be.visible')
    })

    it('successfully generates new mnemonic phrase', () => {
        cy.visit('/')

        cy.get('#login_button').click()
        cy.get('#generate_mnemonic').click()

        cy.get('#import_mnemonic').should($input => {
             expect($input.val()).to.match(/^(\w+\s){11}\w+$/)
        })
    })

    it('successfully logins', () => {
        cy.visit('/')
        cy.get('#login_button').click()
        cy.get('#import_mnemonic').type(Cypress.env("testMnemonic"))
        cy.get('#sign_in_button').click()

        cy.get('#currency_full_name').should('have.text', 'Ethereum')
    })
})
