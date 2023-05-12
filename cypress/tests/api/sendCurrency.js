const assert = require('assert');
const axios = require('axios');

const backendUrl = 'https://vh6o5auivh.execute-api.eu-central-1.amazonaws.com/production'
const getBlockchainUrl = `${backendUrl}/blockchains`;
const sendCurrencyUrl = `${backendUrl}/sendCurrency`;
const ethereumAddress = '0x107f3cCC0Ac5aC2950A2A3860029b2677F3B79CC'
const sepoliaTxUrlRegex = /^https:\/\/sepolia\.etherscan\.io\/tx\/0x[a-fA-F0-9]{64}$/;
const bnbTxUrlRegex = /^https:\/\/testnet\.bscscan\.com\/tx\/0x[a-fA-F0-9]{64}$/;
const binanceTxUrlRegex = /^https:\/\/live\.blockcypher\.com\/btc-testnet\/tx\/[a-fA-F0-9]{64}$/;

describe('Send Currency API tests', function () {
    this.timeout(60000);

    it('should successfully send ETH currency', async function () {
        try {
            await setCurrency('ETH');

            const data = {
                to: ethereumAddress,
                amount: '0.0000000000001',
            };
            const response = await axios.post(sendCurrencyUrl, data);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.status, 'success');
            assert.match(response.data.result, sepoliaTxUrlRegex);
        } catch (error) {
            console.log(error.response.data);
            assert.strictEqual(error.response.status, 200);
        }
    });

    it('should successfully send MKN currency', async function () {
        try {
            await setCurrency('MKN');

            const data = {
                to: ethereumAddress,
                amount: '0.0000000000001',
            };
            const response = await axios.post(sendCurrencyUrl, data);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.status, 'success');
            assert.match(response.data.result, sepoliaTxUrlRegex);
        } catch (error) {
            console.log(error.response.data);
            assert.strictEqual(error.response.status, 200);
        }
    });

    it('should successfully send BNB currency', async function () {
        try {
            await setCurrency('BNB');

            const data = {
                to: ethereumAddress,
                amount: '0.0000000000001',
            };
            const response = await axios.post(sendCurrencyUrl, data);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.status, 'success');
            assert.match(response.data.result, bnbTxUrlRegex);
        } catch (error) {
            console.log(error.response.data);
            assert.strictEqual(error.response.status, 200);
        }
    });

    it('should successfully send BTC currency', async function () {
        try {
            await setCurrency('BTC');

            const data = {
                to: 'muP9aYqRznMa3iphX6MkubfLstRrqXpjyf',
                amount: '0.0000000000001',
            };
            const response = await axios.post(sendCurrencyUrl, data);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.status, 'success');
            assert.match(response.data.result, binanceTxUrlRegex);
        } catch (error) {
            console.log(error.response.data);
            assert.strictEqual(error.response.status, 200);
        }
    });

    it('should return insufficient funds error', async function () {
        try {
            await setCurrency('ETH');

            const postData = {
                to: ethereumAddress,
                amount: '100',
            };
            const response = await axios.post(sendCurrencyUrl, postData);
            assert.strictEqual(response.status, 400);
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
            assert.strictEqual(error.response.data.result, 'Returned error: insufficient funds for gas * price + value');
        }
    });

    async function setCurrency(currency) {
        const getBlockchainResponse = await axios.get(`${getBlockchainUrl}/${currency}`);
        assert.strictEqual(getBlockchainResponse.status, 200);
    }
});
