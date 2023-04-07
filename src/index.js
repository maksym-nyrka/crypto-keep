const DEFAULT_CURRENCY = "ETH";

const WalletUi = require("./core/ui/WalletUi");
const BlockchainService = require("./core/blockchain/BlockchainService");
const HttpService = require("./core/services/HttpService");

class Application {

    constructor() {
        this.setCurrency(DEFAULT_CURRENCY);
        this.httpService = new HttpService(this);
        this.walletUi = new WalletUi(this);
        this.blockchainService = new BlockchainService(this);
    }

    prepareInterface() {
        this.walletUi.renderUi();
    }

    changeCurrency(currency) {
        this.setCurrency(currency);
        this.walletUi.renderUi();
    }

    setCurrency(currency) {
        this.currency = currency;
    }

    getCurrency() {
        return this.currency;
    }

    getCurrentBalance() {
        return new Promise(async (resolve, reject) => {
            try {
                let balance = await this.blockchainService.getCurrentBalance();
                resolve(balance);
            } catch (e) {
                reject(e);
            }
        })
    }

    getCurrentAddress() {
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.blockchainService.getCurrentAddress();
                resolve(address);
            } catch (e) {
                reject(e);
            }
        })
    }

    sendCurrency(to, amount) {
        return new Promise(async (resolve, reject) => {
            try {
                let address = await this.blockchainService.sendCurrency(to, amount);
                resolve(address);
            } catch (e) {
                reject(e);
            }
        })
    }

    generateMnemonic() {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.blockchainService.generateMnemonic();
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    importMnemonic(mnemonic) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.blockchainService.importMnemonic(mnemonic);
                this.prepareInterface();
                console.log("importMnemonic" ,this)
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }
}

new Application();
// app.prepareInterface();
// alert("Please insert mnemonic");
