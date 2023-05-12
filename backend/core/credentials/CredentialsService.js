const EthWallet = require('./protocols/EthWallet');
const Erc20Wallet = require('./protocols/Erc20Wallet');
const BtcWallet = require('./protocols/BtcWallet');
const LtcWallet = require('./protocols/LtcWallet');
const BnbWallet = require("./protocols/BnbWallet");
const Validator = require("../validators/Validator");

class CredentialsService {

    constructor(app) {
        this.app = app;
        this.validator = new Validator();
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

    getActiveProtocol() {
        return this.protocols[this.app.getCurrency()];
    }

    getMnemonic() {
        return this.mnemonic;
    }

    setMnemonic(mnemonic) {
        this.validator.validateString(mnemonic);
        this.mnemonic = mnemonic;
    }


    getAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    this.getActiveProtocol().provideAddress(
                        this.getMnemonic()));
            } catch (e) {
                reject(e);
            }
        })
    }

    getPrivateKey() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(this.getActiveProtocol().providePrivateKey(this.getMnemonic()));
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = CredentialsService;
