describe('Get blockchain details API', () => {
    const getBlockchainUrl = `${Cypress.env("backendUrl")}/blockchains`;

    const ethereumAddress = '0x107f3cCC0Ac5aC2950A2A3860029b2677F3B79CC'

    beforeEach(function () {
        cy.loginApi(Cypress.env('testMnemonic'));
    });

    context("GET /blockchains/:currencyTicker", function () {
        it("gets ETH blockchain details", function () {
            const currencyTicker = 'ETH';
            cy.request("GET", `${getBlockchainUrl}/${currencyTicker}`).then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body.fullName).to.be.eq('Ethereum');
                expect(response.body.address).to.be.eq(ethereumAddress);
                expect(response.body.balance).to.match(/^\d+(\.\d+)?$/);
                expect(response.body.imagePath).to.be.eq('/images/ethereum.png');
            });
        });

        it("gets BTC blockchain details", function () {
            const currencyTicker = 'BTC';
            cy.request("GET", `${getBlockchainUrl}/${currencyTicker}`).then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body.fullName).to.be.eq('Bitcoin');
                expect(response.body.imagePath).to.be.eq('/images/bitcoin.png');
                expect(response.body.address).to.be.eq('muP9aYqRznMa3iphX6MkubfLstRrqXpjyf');
                expect(response.body.balance).to.match(/^\d+(\.\d+)?$/);
            });
        });

        it("gets MKN Token blockchain details", function () {
            const currencyTicker = 'MKN';
            cy.request("GET", `${getBlockchainUrl}/${currencyTicker}`).then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body.fullName).to.be.eq('MKN Token');
                expect(response.body.imagePath).to.be.eq('/images/ethereum_token.png');
                expect(response.body.address).to.be.eq(ethereumAddress);
                expect(response.body.balance).to.match(/^\d+(\.\d+)?$/);
            });
        });

        it("gets LTC blockchain details", function () {
            const currencyTicker = 'LTC';
            cy.request("GET", `${getBlockchainUrl}/${currencyTicker}`).then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body.fullName).to.eq('Litecoin (Mainnet)');
                expect(response.body.imagePath).to.eq('/images/litecoin.png');
                expect(response.body.address).to.be.eq('LXFymFnPjRUQBYeSkxqDwFXCb1m3ZZPVaK');
                expect(response.body.balance).to.match(/^\d+(\.\d+)?$/);
            });
        });

        it("gets BNB blockchain details", function () {
            const currencyTicker = 'BNB';
            cy.request("GET", `${getBlockchainUrl}/${currencyTicker}`).then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body.fullName).to.be.eq('Binance Coin');
                expect(response.body.address).to.be.eq(ethereumAddress);
                expect(response.body.balance).to.match(/^\d+(\.\d+)?$/);
                expect(response.body.imagePath).to.eq('/images/bnb.png');
            });
        });

        it("gets non-existent blockchain details", function () {
            const currencyTicker = 'AAA';
            cy.request({
                method: "GET",
                url: `${getBlockchainUrl}/${currencyTicker}`,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.be.eq(404);
                expect(response.body).to.be.eq('Currency not found');
            });
        });
    });
})
