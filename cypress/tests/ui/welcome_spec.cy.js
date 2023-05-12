describe('Welcome', () => {

    it('contains all expected text', () => {
        cy.visit('/')

        cy.get('#site_name').should('have.text', 'CryptoKeep')
            .should('be.visible')

        cy.get('[data-cy="welcome-text"]').should('have.text', 'Welcome to CryptoKeep!')
            .should('be.visible')

        cy.get('[data-cy="welcome-description-text"]').should('have.text', 'Non-custodial multicurrency wallet.')
            .should('be.visible')

        cy.get('[data-cy="login-text"]').should('have.text', 'Login via mnemonic to start using it:')
            .should('be.visible')

        cy.get('#login_button').should('have.text', 'Login')
            .should('be.visible')

        cy.get('[data-cy="footer-text"]').should('have.text', 'Made by maksym.nyrka')
            .should('be.visible')

        cy.get('[data-cy="footer-link"]').should('have.attr', 'href', 'mailto:maksym.nyrka@gmail.com')
            .should('be.visible')
    })
})
