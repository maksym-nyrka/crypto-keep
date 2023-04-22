const Web3 = require('web3');
const EthLib = require('/src/core/blockchain/eth/EthLib');
const BnbValidator = require('/src/core/validators/blockchain/BnbValidator')
const BnbConverter = require('/src/core/converters/BnbConverter');
const isProduction = require("/src/core/helpers/isProduction");

const ANKR_PROVIDER_URL = "https://rpc.ankr.com/";
const MAINNET_CHAIN_ID = 56;
const TESTNET_CHAIN_ID = 97;
const MAINNET_NETWORK = "bsc";
const TESTNET_NETWORK = "bsc_testnet_chapel";
const MAINNET_EXPLORER = "https://bscscan.com";
const TESTNET_EXPLORER = "https://testnet.bscscan.com";

class BnbLib extends EthLib {

    constructor(app) {
        super(app);
        this.validator = new BnbValidator();
        this.converter = new BnbConverter();
        this.provider = new Web3(new Web3.providers.HttpProvider(this.getProviderUrl()));
    }

    getProviderUrl() {
        const network = isProduction ? MAINNET_NETWORK : TESTNET_NETWORK;

        return `${ANKR_PROVIDER_URL}${network}`;
    }

    getChainId() {
        return this.app.isProduction() ? MAINNET_CHAIN_ID : TESTNET_CHAIN_ID;
    }

    getCurrencyFullName() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve("Binance Coin");
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrencyImage() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve("/dist/images/bnb.png");
            } catch (e) {
                reject(e);
            }
        })
    }

    getTransactionUrl(tx) {
        return new Promise(async (resolve, reject) => {
            try {
                const explorerUrl = isProduction ? MAINNET_EXPLORER : TESTNET_EXPLORER;
                const transactionUrl = `${explorerUrl}/tx/${tx}`;
                resolve(transactionUrl);
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = BnbLib;
