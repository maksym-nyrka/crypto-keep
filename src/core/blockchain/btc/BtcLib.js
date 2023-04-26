const {ECPair, TransactionBuilder, networks} = require('bitcoinjs-lib');

const AbstractCurrencyLibrary = require("../AbstractCurrencyLibrary");
const BtcValidator = require("../../validators/blockchain/BtcValidator");
const BtcConverter = require("../../converters/BtcConverter");
const BitcoinBlockcypherProvider = require("./BitcoinBlockcypherProvider");
const isProduction = require("../../helpers/isProduction");

const MAINNET_EXPLORER = "https://live.blockcypher.com/btc";
const TESTNET_EXPLORER = "https://live.blockcypher.com/btc-testnet";

class BtcLib extends AbstractCurrencyLibrary {

    constructor(app) {
        let validator = new BtcValidator();
        let converter = new BtcConverter();
        let provider = new BitcoinBlockcypherProvider(app, validator, converter);

        super(app, provider, validator, converter);
    }

    getNetwork() {
        return this.app.isProduction() ? networks.bitcoin : networks.testnet;
    }

    getBalance(address) {
        return new Promise(async (resolve, reject) => {
            try {
                this.getValidator().validateAddress(address);

                let balance = await this.provider.getBalance(address);
                balance = await this.toDecimals(balance);
                this.getValidator().validateNumber(balance);

                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                //console.log("btcLib sendCurrency start")
                let txParams = await this._formatTransactionParameters(to, amount);
                //console.log("btcLib sendCurrency formatTxParams", txParams)
                let rawTx = await this._createSignRawTx(txParams);
                //console.log("btcLib sendCurrency rawTx", rawTx)
                let txHash = await this.provider.sendTx(rawTx);
                //console.log("btcLib sendCurrency sendTx", txHash)
                resolve(txHash);
            } catch (e) {
                reject(e);
            }
        })
    }

    _createSignRawTx(txParams) {
        return new Promise(async (resolve, reject) => {
            try {
                //console.log("btc lib createSignRawTx");
                let wif = await this.getCurrentPrivateKey();
                let keyring = await ECPair.fromWIF(wif, this.getNetwork());
                //console.log("keyring", keyring);
                //console.log("btcLib txb")
                let txb = new TransactionBuilder(this.getNetwork());
                //console.log("btcLib addSignedUtxos");
                txb = await this.provider.addSignedUtxos(keyring, txb, txParams["from"], txParams["to"], txParams["amount"], txParams["fee"]);
                //console.log("btcLib txb")
                let txHash = txb.build().toHex();
                this.validator.validateString(txHash, 'txHash');
                //console.log('_createSignRawTx end txHash ', txHash);
                resolve(txHash);
            } catch (e) {
                reject(e);
            }
        })
    }


    _formatTransactionParameters(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                let from = await this.getCurrentAddress();
                //console.log("_formatTransactionParameters from", from)
                let fee = await this.getFee();
                //console.log('formatTxParams fee', fee)
                amount = parseFloat(amount);
                //console.log('formatTxParams amount', amount)
                this.validator.validateAddress(to);
                this.validator.validateNumber(amount);
                this.validator.validateNumber(fee);
                //console.log('formatTxParams validate over')
                amount = await this.fromDecimals(amount);
                fee = await this.fromDecimals(fee);
                //console.log('formatTxParams afterDecimals', fee)
                amount = Math.round(amount);
                fee = Math.round(fee);
                //console.log('formatTxParams before txParams', amount)
                let txParams = {
                    from: from,
                    to: to,
                    amount: amount,
                    fee: fee
                }
                //console.log('formatTxParams txDParams', txParams)
                resolve(txParams);
            } catch (e) {
                reject(e);
            }
        })
    }


    getFee() {
        return new Promise(async (resolve, reject) => {
            try {
                let fee = await this.provider.getFee()
                //console.log("btcLib getFee", fee);
                resolve(fee);
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

module.exports = BtcLib;
