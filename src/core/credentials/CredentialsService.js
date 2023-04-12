const MnemonicGenerator = require("./MnemonicGenerator");
const EthWallet = require('./protocols/EthWallet');
const Erc20Wallet = require('./protocols/Erc20Wallet');
const BtcWallet = require('./protocols/BtcWallet');
const LtcWallet = require('./protocols/LtcWallet');
const Validator = require("/src/core/validators/Validator");
const BnbWallet = require("./protocols/BnbWallet");

class CredentialsService {

    constructor(app) {
        this.app = app;
        this.validator = new Validator();
        this.generator = new MnemonicGenerator();
        let eth = new EthWallet();
        let erc20 = new Erc20Wallet();
        let btc = new BtcWallet();
        let ltc = new LtcWallet();
        let bnb = new BnbWallet();
        this.mnemonic = "";
        this.protocols = {
            BTC: btc,
            ETH: eth,
            MKN: erc20,
            LTC: ltc,
            BNB: bnb,
        }
    }

    _getActiveProtocol() {
        return this.protocols[this.app.getCurrency()];
    }

    generateMnemonic() {
        return this.generator.generateMnemonic();
    }

    _setMnemonic(mnemonic) {
        this.validator.validateString(mnemonic);
        this.mnemonic = mnemonic;
    }

    _getMnemonic() {
        return this.mnemonic;
    }

    importMnemonic(mnemonic) {
        this._setMnemonic(mnemonic);
    }


    getAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    this._getActiveProtocol().provideAddress(
                        this._getMnemonic()));
            } catch (e) {
                reject(e);
            }
        })
    }

    getPrivateKey() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this._getActiveProtocol().providePrivateKey(this._getMnemonic()));
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = CredentialsService;
