const Web3 = require("web3");
const Transaction = require('ethereumjs-tx');
const EthConverter = require("../../converters/EthConverter");
const AbstractCurrencyLibrary = require("../AbstractCurrencyLibrary");
const EthValidator = require("../../validators/blockchain/EthValidator");
const isProduction = require("../../helpers/isProduction");

const INFURA_PROVIDER_URL = `https://network.infura.io/v3/`;
const GWEI = 10 ** 9;
const GAS_PRICE = 70 * GWEI;
const GAS_LIMIT = 21000;
const MAINNET_CHAIN_ID = 1;
const SEPOLIA_CHAIN_ID = 11155111;
const MAINNET_NETWORK = "mainnet";
const SEPOLIA_NETWORK = "sepolia";
const MAINNET_EXPLORER = "https://etherscan.io";
const TESTNET_EXPLORER = "https://sepolia.etherscan.io";

class EthLib extends AbstractCurrencyLibrary {

    constructor(app) {
        //console.log("EthLib app", app);
        let validator = new EthValidator();
        let converter = new EthConverter();
        super(app, null, validator, converter);
        let web3 = new Web3(new Web3.providers.HttpProvider(this.getProviderUrl()));
        this.setProvider(web3);
    }

    getProviderUrl() {
        const network = this.app.isProduction() ? MAINNET_NETWORK : SEPOLIA_NETWORK;

        return `${INFURA_PROVIDER_URL}${process.env.INFURA_API_TOKEN}`
            .replace('network', network);
    }

    getChainId() {
        return this.app.isProduction() ? MAINNET_CHAIN_ID : SEPOLIA_CHAIN_ID;
    }

    getBalance(address) {
        return new Promise(async (resolve, reject) => {
            try {
                this.getValidator().validateAddress(address);
                let balance = await this.provider.eth.getBalance(address);
                balance = await this.toDecimals(balance);

                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                this.getValidator().validateAddress(to, "TX Receiver");
                this.getValidator().validateNumber(amount, "sendCurrency amount");

                let txData = await this._formatTransactionParams(to, amount);
                let hash = await this._makeTransaction(txData);

                resolve(hash);
            } catch (e) {
                reject(e);
            }
        })
    }

    _formatTransactionParams(to, value, data = "") {
        return new Promise(async (resolve, reject) => {
            try {
                this.getValidator().validateAddress(to);
                this.getValidator().validateNumber(value);
                this.getValidator().validateString(data);

                let privateKey = await this.getCurrentPrivateKey();
                this.getValidator().validateString(privateKey);

                let privateKeyBuffer = Buffer.from(privateKey, 'hex');
                let from = await this.getCurrentAddress();
                this.getValidator().validateAddress(from);

                let nonce = await this.getNextNonce();
                this.getValidator().validateNumber(nonce);

                let gasPrice = this.getGasPrice();
                this.getValidator().validateNumber(gasPrice);

                let gasLimit = this.getGasLimit();
                this.getValidator().validateNumber(gasLimit);

                let chainId = this.getChainId();
                this.getValidator().validateNumber(chainId);

                value = await this.fromDecimals(value);

                let txParams = {
                    "from": from,
                    "to": to,
                    "privateKey": privateKeyBuffer,
                    "value": this.provider.utils.numberToHex(value),
                    "gasPrice": this.provider.utils.numberToHex(gasPrice),
                    "gasLimit": gasLimit,
                    "nonce": nonce,
                    "data": data,
                    "chainId": chainId
                };

                resolve(txParams);
            } catch (e) {
                reject(e);
            }
        })
    }

    getGasPrice() {
        return GAS_PRICE;
    }

    getGasLimit() {
        return GAS_LIMIT;
    }

    getNextNonce() {
        return new Promise(async (resolve, reject) => {
            try {
                let address = String(await this.getCurrentAddress());
                let nonce = await this.provider.eth.getTransactionCount(address);

                resolve(nonce);
            } catch (e) {
                reject(e)
            }
        });
    }

    _makeTransaction(txParams) {
        return new Promise(async (resolve, reject) => {
            try {
                const tx = new Transaction(txParams);
                tx.sign(txParams.privateKey);
                const raw = `0x${tx.serialize().toString('hex')}`;

                this.provider.eth.sendSignedTransaction(raw).on("receipt", (data) => {
                    //console.log(data);
                    let transactionHash = data["transactionHash"];
                    resolve(transactionHash);
                }).on("error", (e) => {
                    //console.error(e);
                    reject(e);
                });

            } catch (e) {
                reject(e);
            }
        });
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

module.exports = EthLib;
