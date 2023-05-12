const EthLib = require("./eth/EthLib");
const Erc20Lib = require('./erc20/Erc20Lib');
const BtcLib = require("./btc/BtcLib");
const LtcLib = require("./ltc/LtcLib");
const BnbLib = require("./bnb/BnbLib");
const CredentialsService = require("../credentials/CredentialsService");

class BlockchainService {

    constructor(app) {
        this.app = app;
        this.credentials = new CredentialsService(app);
        //console.log("BlockchainService app",app);
        let eth = new EthLib(app);
        //console.log("BlockchainService app2",app);
        let erc20 = new Erc20Lib(app);
        let btc = new BtcLib(app);
        let ltc = new LtcLib(app);
        let bnb = new BnbLib(app);

        this.libraries = {
            "ETH": eth,
            "MKN": erc20,
            "BTC": btc,
            "LTC": ltc,
            "BNB": bnb,
        };
        //console.log("libraries",this.libraries);
    }

    getCurrentLibrary() {
        //console.log("getCurrentLibrary",this.app.getCurrency(),this.libraries[this.app.getCurrency()])
        return this.libraries[this.app.getCurrency()];
    }

    getCurrentAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.getCurrentLibrary().getCurrentAddress();

                resolve(address);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrencyFullName() {
        return new Promise(async (resolve, reject) => {
            try {
                let name = await this.getCurrentLibrary().getCurrencyFullName();
                resolve(name);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrencyImage() {
        return new Promise(async (resolve, reject) => {
            try {
                let image = await this.getCurrentLibrary().getCurrencyImage();
                resolve(image);
            } catch (e) {
                reject(e);
            }
        })
    }

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.getCurrentLibrary().sendCurrency(to, amount);

                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentBalance() {
        return new Promise(async (resolve, reject) => {
            try {
                let balance = await this.getCurrentLibrary().getCurrentBalance();

                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    setMnemonic(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.credentials.setMnemonic(mnemonic);

                resolve();
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentTransactionUrl(tx) {
        return new Promise(async (resolve, reject) => {
            try {

                let url = await this.getCurrentLibrary().getCurrentTransactionUrl(tx);

                resolve(url);
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = BlockchainService;
