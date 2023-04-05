const Web3 = require("web3");
const Transaction = require('ethereumjs-tx');
const EthConverter = require("../../helpers/EthConverter");
const AbstractCurrencyLibrary = require("../AbstractCurrencyLibrary");
const EthValidator = require("../../validators/blockchain/EthValidator");

const PROVIDER_URL = process.env.PROVIDER_URL;
const ETH_ADDRESS = process.env.ETH_ADDRESS;
const PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;
const GWEI = 10 ** 9;
const GAS_PRICE = 70 * GWEI;
const GAS_LIMIT = 21000;

class EthLib extends AbstractCurrencyLibrary {

    constructor() {
        let web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
        let validator = new EthValidator();
        let converter = new EthConverter();
        super(web3, validator, converter);
    }

    getAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(ETH_ADDRESS);
            } catch (e) {
                reject(e);
            }
        })
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

    getPrivateKey() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(PRIVATE_KEY);
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
                let from = await this.getAddress();
                this.getValidator().validateAddress(from);

                let nonce = await this.getNextNonce();
                this.getValidator().validateNumber(nonce);

                let gasPrice = this.getGasPrice();
                this.getValidator().validateNumber(gasPrice);

                let gasLimit = this.getGasLimit();
                this.getValidator().validateNumber(gasLimit);

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
                let address = String(await this.getAddress());
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
                    console.log(data);
                    let transactionHash = data["transactionHash"];
                    resolve(transactionHash);
                }).on("error", (e) => {
                    console.error(e);
                    reject(e);
                });

            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = EthLib;