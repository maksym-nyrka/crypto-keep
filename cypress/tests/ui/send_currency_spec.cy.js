
describe('Send currency', () => {
    const sendCurrencyUrl = `${Cypress.env("backendUrl")}/sendCurrency`;

    const mnkButton = '[data-value="MKN"]'
    const btcButton = '[data-value="BTC"]'
    const bnbButton = '[data-value="BNB"]'
    const receiverInput = '#receiver_input'
    const amountInput = '#amount_input'
    const sendButton = '#send_button'
    const alertTitle = '#swal2-title'
    const alertText = '#swal2-html-container'
    const alertConfirmButton = '.swal2-confirm'

    beforeEach(function () {
        cy.login(Cypress.env('testMnemonic'));
    });

    it('successfully sends Ethereum', () => {
        cy.intercept('POST', sendCurrencyUrl, { fixture: 'sendEthereumResponse.json' })

        cy.get(receiverInput).type('0x107f3cCC0Ac5aC2950A2A3860029b2677F3B79CC')
        cy.get(amountInput).type('0.0001')
        cy.get(sendButton).click()

        cy.get(alertTitle).should('have.text', 'Woo-hoo! Successfully sent!')
        cy.get(alertText).should('have.text', 'View on block explorer: https://sepolia.etherscan.io/tx/0x8e3c2ba96c0c73b7a71654f82840749b2687cfec79b09ba5af0a3a93928f5596')
        cy.get(alertConfirmButton).should('have.text', 'OK')
    })

    it('successfully sends MKN Token', () => {
        cy.get(mnkButton).click()

        cy.intercept('POST', sendCurrencyUrl, { fixture: 'sendMknResponse.json' })

        cy.get(receiverInput).type('0x107f3cCC0Ac5aC2950A2A3860029b2677F3B79CC')
        cy.get(amountInput).type('0.0001')
        cy.get(sendButton).click()

        cy.get(alertTitle).should('have.text', 'Woo-hoo! Successfully sent!')
        cy.get(alertText).should('have.text', 'View on block explorer: https://sepolia.etherscan.io/tx/0x53afebef3d289c69145121a3d68c589b7d892a04b99a545906e59f637164c24d')
        cy.get(alertConfirmButton).should('have.text', 'OK')
    })

    it('successfully sends Bitcoin', () => {
        cy.get(btcButton).click()

        cy.intercept('POST', sendCurrencyUrl, { fixture: 'sendBitcoinResponse.json' })

        cy.get(receiverInput).type('muP9aYqRznMa3iphX6MkubfLstRrqXpjyf')
        cy.get(amountInput).type('0.0001')
        cy.get(sendButton).click()

        cy.get(alertTitle).should('have.text', 'Woo-hoo! Successfully sent!')
        cy.get(alertText).should('have.text', 'View on block explorer: https://live.blockcypher.com/btc-testnet/tx/6169d545431589b29d51e9e067b0f6db7dfd2cd87c9079320cb622263509c903')
        cy.get(alertConfirmButton).should('have.text', 'OK')
    })

    it('successfully sends Binance Coin', () => {
        cy.get(bnbButton).click()

        cy.intercept('POST', sendCurrencyUrl, { fixture: 'sendBnbResponse.json' })

        cy.get(receiverInput).type('0x107f3cCC0Ac5aC2950A2A3860029b2677F3B79CC')
        cy.get(amountInput).type('0.0001')
        cy.get(sendButton).click()

        cy.get(alertTitle).should('have.text', 'Woo-hoo! Successfully sent!')
        cy.get(alertText).should('have.text', 'View on block explorer: https://testnet.bscscan.com/tx/0x1e9b0c47bedcc7f528588651f27ce77ba7b11700d14a9b1b671761a5824e0f1b')
        cy.get(alertConfirmButton).should('have.text', 'OK')
    })
})
