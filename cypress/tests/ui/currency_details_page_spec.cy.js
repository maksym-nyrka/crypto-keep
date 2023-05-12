
describe('Currency details page', () => {
    let ethButton = '[data-value="ETH"]'
    let mnkButton = '[data-value="MKN"]'
    let btcButton = '[data-value="BTC"]'
    let ltcButton = '[data-value="LTC"]'
    let bnbButton = '[data-value="BNB"]'
    let currencyFullName = '#currency_full_name'
    let currencyImage= '#currency_image'
    let currencyAddress= '#currency_address'
    let currencyBalance= '#currency_balance'
    let currencyName= '.currency_name'

    beforeEach(function () {
        cy.login(Cypress.env('testMnemonic'));
    });

    it('successfully displays header items', () => {
        cy.get(ethButton).should('be.visible')
            .should('have.text', 'ETH')
            .should('have.class', 'active')
        cy.get(mnkButton).should('be.visible')
            .should('have.text', 'MKN')
        cy.get(btcButton).should('be.visible')
            .should('have.text', 'BTC')
        cy.get(ltcButton).should('be.visible')
            .should('have.text', 'LTC')
        cy.get(bnbButton).should('be.visible')
            .should('have.text', 'BNB')
    })

    it('successfully displays Currency details page items', () => {
        cy.get(currencyFullName).should('be.visible')
        cy.get(currencyImage).should('be.visible')
        cy.get('[data-cy="currency-address-title"]').should('be.visible')
            .should('have.text', 'Address:')

        cy.get(currencyAddress).should('be.visible')
        cy.get(currencyBalance).should('be.visible')
        cy.get(currencyName).should('be.visible')
        cy.get('[data-cy="send-currency-title"]').should('be.visible')
            .should('have.text', 'Send currency:')

        cy.get('[data-cy="receiver-title"]').should('be.visible')
            .should('have.text', 'Receiver')

        cy.get('#receiver_input').should('be.visible')
            .should('have.attr', 'autocomplete', 'off')
            .should('have.attr', 'type', 'text')

        cy.get('[data-cy="amount-title"]').should('be.visible')
            .should('have.text', 'Amount')

        cy.get('#amount_input').should('be.visible')
            .should('have.attr', 'autocomplete', 'off')
            .should('have.attr', 'type', 'number')

        cy.get('#send_button').should('be.visible')
            .should('have.text', 'Send')

        cy.get('[data-cy="footer-link"]').should('have.attr', 'href', 'mailto:maksym.nyrka@gmail.com')
            .should('be.visible')
    })

    it('successfully displays Ethereum details', () => {
        cy.get(currencyFullName).should('have.text', 'Ethereum')
        cy.get(currencyImage).should('have.attr', 'src', '/images/ethereum.png')
        cy.get(currencyAddress).should('have.text', '0x107f3cCC0Ac5aC2950A2A3860029b2677F3B79CC')
        cy.get(currencyBalance).should($balance => {
            expect($balance.text()).to.match(/^\d+(\.\d+)?$/)
        })
        cy.get(currencyName).should('have.text', 'ETH')
    })

    it('successfully displays MKN Token details', () => {
        cy.get(mnkButton).click()

        cy.get(currencyFullName).should('have.text', 'MKN Token')
        cy.get(currencyImage).should('have.attr', 'src', '/images/ethereum_token.png')
        cy.get(currencyAddress).should('have.text', '0x107f3cCC0Ac5aC2950A2A3860029b2677F3B79CC')
        cy.get(currencyBalance).should($balance => {
            expect($balance.text()).to.match(/^\d+(\.\d+)?$/)
        })
        cy.get(currencyName).should('have.text', 'MKN')
    })

    it('successfully displays Bitcoin details', () => {
        cy.get(btcButton).click()

        cy.get(currencyFullName).should('have.text', 'Bitcoin')
        cy.get(currencyImage).should('have.attr', 'src', '/images/bitcoin.png')
        cy.get(currencyAddress).should('have.text', 'muP9aYqRznMa3iphX6MkubfLstRrqXpjyf')
        cy.get(currencyBalance).should($balance => {
            expect($balance.text()).to.match(/^\d+(\.\d+)?$/)
        })
        cy.get(currencyName).should('have.text', 'BTC')
    })

    it('successfully displays Litecoin details', () => {
        cy.get(ltcButton).click()

        cy.get(currencyFullName).should('have.text', 'Litecoin (Mainnet)')
        cy.get(currencyImage).should('have.attr', 'src', '/images/litecoin.png')
        cy.get(currencyAddress).should('have.text', 'LXFymFnPjRUQBYeSkxqDwFXCb1m3ZZPVaK')
        cy.get(currencyBalance).should($balance => {
            expect($balance.text()).to.match(/^\d+(\.\d+)?$/)
        })
        cy.get(currencyName).should('have.text', 'LTC')
    })

    it('successfully displays Binance Coin details', () => {
        cy.get(bnbButton).click()

        cy.get(currencyFullName).should('have.text', 'Binance Coin')
        cy.get(currencyImage).should('have.attr', 'src', '/images/bnb.png')
        cy.get(currencyAddress).should('have.text', '0x107f3cCC0Ac5aC2950A2A3860029b2677F3B79CC')
        cy.get(currencyBalance).should($balance => {
            expect($balance.text()).to.match(/^\d+(\.\d+)?$/)
        })
        cy.get(currencyName).should('have.text', 'BNB')
    })
})
